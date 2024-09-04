const Chat = require("../models/Chat");
const User = require("../models/User")
const asyncHandler = require("express-async-handler");

exports.searchUser = async (req, res) => {
    try {
        console.log("inside search user inside server.")
        console.log("req : ", req?.body);

        const { firstName, lastName } = req.body;
        if (!firstName || !lastName) {
            return res.json({
                success: false,
                message: "All fields are required"
            })
        }

        const name = {
            $or: [
                { firstName: { $regex: firstName, $options: 'i' } },
                { lastName: { $regex: lastName, $options: 'i' } }
            ]
        };

        // console.log("name : ", name);

        if (!name) {
            return res.json({
                success: false,
                message: "User not foound"
            })
        }

        const user = await User.find(name).select('firstName lastName image email').find({ _id: { $ne: req.user.id } })


        console.log("User in searchUser Server : ", user);

        return res.status(200).json({
            success: true,
            data: user,
            message: "User fetched successfully"
        })

    } catch (error) {
        console.log("Error in search user : ", error)
        return res.status(401).json({ success: false, message: "Error in User founding" })
    }
}

// create One-to-One Chat..
exports.createChat = async (req, res) => {
    try {
        // we can get login user id need other user id
        // console.log("req.body : ", req?.body);
        // console.log("req.user : ", req?.user);
        const { userId } = req.body;
        if (!userId) {
            return res.json({ success: false, message: "User id is required" })
        }
        // check user exsisit or not.
        const user = await User.findById(userId);
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        // check chat is present between the twoUser
        const chat = await Chat.find({
            isGroupChat: false,
            $and: [
                {
                    users: { $elemMatch: { $eq: req.user.id } }
                },
                {
                    users: { $elemMatch: { $eq: userId } }
                }
            ]
        }).populate("users", "-password")
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: "-password"
                }

            })

        console.log("Chat : ", chat);
        // if present then return the chat
        if (chat.length > 0) {
            return res.status(200).json({
                success: true,
                data: chat,
                message: "Chat found"
            })
        }
        // if not present then create a new chat
        const newChat = new Chat({
            chatName: "sender",
            isGroupChat: false,
            users: [req.user.id, userId],
        })

        // save the chat
        await newChat.save()

        const fullChat = await Chat.findById({ _id: newChat._id })
            .populate("users", "-password")
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: "-password"
                }
            })
            .populte("lastMessage")
        // console.log("Full Chat : ", fullChat);

        // return the chat
        return res.status(200).json({
            success: true,
            data: fullChat,
            message: "Chat created"
        })
    } catch (error) {
        console.log("Error in creae chat : " + error)
        return res.status(500)
            .json({
                success: false,
                message: "Error creating chat"
            })
    }
}




// Fetch all the chat for login user
exports.getChat = asyncHandler(async (req, res) => {
    try {
        const allChats = await Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
            .populate({
                path: "users",
                select: "-password"
            })
            .populate({
                path: "lastMessage",
                populate: {
                    path: "sender",
                    select: "-password"
                }
            })
            .sort({ updatedAt: -1 })


        // allChats.forEach(chat => {
        //     console.log(`Chat ID: ${chat._id}`);
        //     console.log(`Last Message: ${chat.lastMessage}`);
        // });

        // console.log("All Chats in getChat Controller : ", allChats);

        return res.status(200)
            .json({
                success: true,
                data: allChats,
                message: "Fetched all chat successfully"
            })

    }
    catch (e) {
        console.log("Error in fetch chat : " + e);
        return res.status(403)
            .json({
                success: false,
                message: "Error frtching chat"
            })
    }
})

// create a group chat
exports.createGroupChat = asyncHandler(async (req, res) => {
    try {
        console.log("req.body : ", req.body);

        const { name } = req.body;

        console.log("name : ", name);

        if (!req.body?.users || !name) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please fill all the fields"
                });
        }

        let users = req?.body?.users;

        // let users;
        // try {
        //     users = JSON.parse(req.body.users);
        // } catch (error) {
        //     return res.status(400).send({ message: "Invalid users format" });
        // }

        if (users.length < 2) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please enter at least 2 users to create group"
                })
        }

        users.push(req.user.id);
        console.log("users : ", users);
        // create a new group chat
        const groupChat = await Chat.create({
            chatName: name,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user.id

        })

        console.log("Group Chat : ", groupChat)

        // const fullChat = await Chat.findById({ _id: groupChat._id })
        //     .populate('users', '-password')
        //     .populate('lastMessage', '-password')

        const fullGroupChat = await Chat.findById(groupChat._id)
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate({
                path: 'lastMessage',
                populate: {
                    path: 'sender',
                    select: '-password'
                }
            });

        // console.log("Full Chat : ", fullChat)
        console.log("Full Chat : ", fullGroupChat)

        return res.status(200)
            .json({
                success: true,
                message: "Group chat created successfully",
                data: fullGroupChat
            })

    } catch (error) {
        console.log("Error in create group chat : " + error);
        return res.status(403)
            .json({
                success: false,
                message: "Error creating chat"
            })
    }
})

// rename group
exports.renameGroup = asyncHandler(async (req, res) => {
    try {
        const { chatId, name } = req.body;
        if (!chatId || !name) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please provide chat id and the new name"
                })
        }

        const isExsistChat = await Chat.findById({ _id: chatId });
        if (!isExsistChat) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Chat not found"
                })
        }

        console.log("isExsistChat : ", isExsistChat);

        const newChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatName: name },
            { new: true }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!newChat) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Group not found"
                })
        }
        console.log("new Chat : ", newChat)
        return res.status(200)
            .json({
                success: true,
                message: "Group name updated successfully",
                data: newChat
            })
    } catch (error) {
        console.log("Error in update group chat name : " + error);
        return res.status(400)
            .json({
                success: false,
                message: "Error updation group-chat name"
            })
    }
})

// add to group
exports.addToGroup = asyncHandler(async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        if (!chatId || !userId) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please provide chat id and the user id"
                })
        }
        // Fetch the chat to check admin and existing users
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        if (chat.groupAdmin.toString() !== req.user.id) {
            return res.status(400)
                .json({
                    success: false,
                    message: "You can't add any member because you are not an admin"
                })
        }

        const user = chat.users.find((user => user.toString() === userId))
        if (user) {
            return res.status(400)
                .json({
                    success: false,
                    message: "User is already in the group"
                })
        }
        const updatedChat = await Chat.findByIdAndUpdate(
            { _id: chatId },
            { $push: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updatedChat) {
            return res.status(400)
                .json({
                    success: false, message: "Group not found"
                })
        }

        console.log("updatedChat : ", updatedChat)

        return res.status(200)
            .json({
                success: true,
                message: "User added to the group",
                data: updatedChat
            })

    } catch (error) {
        console.log("Error in adding memeber to group : " + error);
        return res.status(500)
            .json({
                success: false,
                message: "Error adding new member to group-chat"
            })
    }
})

// remove from group
exports.removeFromGroup = asyncHandler(async (req, res) => {
    try {
        const { chatId, userId } = req.body;
        if (!chatId || !userId) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Please provide chat id and the user id"
                })
        }
        // Fetch the chat to check admin and existing users
        const chat = await Chat.findById(chatId);

        if (!chat) {
            return res.status(404).json({
                success: false,
                message: "Chat not found"
            });
        }

        if (chat.groupAdmin.toString() !== req.user.id) {
            return res.status(403)
                .json({
                    success: false,
                    message: "You can't remove any member because you are not an admin"
                })
        }

        const user = chat.users.find((user => user.toString() === userId))
        if (!user) {
            return res.status(400)
                .json({
                    success: false,
                    message: "User not in the group"
                })
        }
        const updatedChat = await Chat.findByIdAndUpdate(
            { _id: chatId },
            { $pull: { users: userId } },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        if (!updatedChat) {
            return res.status(400)
                .json({
                    success: false, message: "Group not found"
                })
        }

        console.log("updatedChat : ", updatedChat)

        return res.status(200)
            .json({
                success: true,
                message: "User remove from the group",
                data: updatedChat
            })

    } catch (error) {
        console.log("Error in removing memeber from group : " + error);
        return res.status(500)
            .json({
                success: false,
                message: "Error removing new member to group-chat"
            })
    }
})

exports.searchUserToCreateGroup = async (req, res) => {
    try {
        console.log("Inside search user inside server.");
        console.log("req.query: ", req);
        console.log("req.query: ", req.query);

        const { search } = req.query;

        if (!search) {
            return res.json({
                success: false,
                message: "Search term is required"
            });
        }

        const nameQuery = {
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } }
            ]
        };

        const users = await User.find(nameQuery)
            .select('firstName lastName image email')
            .find({ _id: { $ne: req.user.id } });

        if (users.length === 0) {
            return res.json({
                success: false,
                message: "No users found"
            });
        }

        console.log("Users found: ", users);

        return res.status(200).json({
            success: true,
            data: users,
            message: "Users fetched successfully"
        });

    } catch (error) {
        console.log("Error in search user: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in finding users"
        });
    }
};
