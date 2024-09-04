const asyncHandler = require("express-async-handler");
const Chat = require("../models/Chat");
const Message = require("../models/Message");
const User = require("../models/User");
const { uploadFileToCloudinary } = require("../utils/fileUploader");
const { format } = require("sharp");
// const sharp = require('sharp');
// const ffmpeg = require('fluent-ffmpeg');
// const fs = require('fs');
// const path = require('path');


exports.sendMessage = asyncHandler(async (req, res) => {
    try {
        console.log("req.body : ", req?.body)
        const { chatId, message } = req?.body;
        const files = req?.files?.file;
        console.log("files : ", files);
        if (!chatId || !message) {
            return res.status(400)
                .json({
                    success: false,
                    error: "Require both chatId and message"
                });
        }
        const isPresent = await Chat.findById(chatId);
        if (!isPresent) {
            return res.status(400)
                .json({
                    success: false,
                    error: "Chat not found"
                })
        }
        // let uploadedData = null;
        // if (file) {
        //     require("dotenv").config();

        //     // Ensure temp directory exists
        //     const tempDir = path.join(__dirname, 'temp');
        //     if (!fs.existsSync(tempDir)) {
        //         fs.mkdirSync(tempDir);
        //     }

        //     // Determine file type
        //     const mimeType = file.mimetype;
        //     const tempFilePath = path.join(tempDir, file.name);
        //     await file.mv(tempFilePath); // Move file to temp directory

        //     if (mimeType.startsWith('image/')) {
        //         // Compress image
        //         const compressedImagePath = path.join(tempDir, `compressed_${file.name}`);
        //         await sharp(tempFilePath)
        //             .resize(800) // Resize image to 800px width, adjust as necessary
        //             .toFile(compressedImagePath);
        //         uploadedData = await uploadFileToCloudinary(compressedImagePath, process.env.FOLDER_NAME);
        //         fs.unlinkSync(compressedImagePath); // Delete compressed image after upload
        //     }
        // else if (mimeType.startsWith('video/')) {
        //     // Compress video
        //     const compressedVideoPath = path.join(tempDir, `compressed_${file.name}`);
        //     await new Promise((resolve, reject) => {
        //         ffmpeg(tempFilePath)
        //             .output(compressedVideoPath)
        //             .videoCodec('libx264')
        //             .size('640x?') // Resize video to 640px width, adjust as necessary
        //             .on('end', resolve)
        //             .on('error', reject)
        //             .run();
        //     });
        //     uploadedData = await uploadFileToCloudinary(compressedVideoPath, process.env.FOLDER_NAME);
        //     fs.unlinkSync(compressedVideoPath); // Delete compressed video after upload
        // } 
        //     else {
        //         // Upload file as is if not an image or video
        //         uploadedData = await uploadFileToCloudinary(tempFilePath, process.env.FOLDER_NAME);
        //     }
        //     fs.unlinkSync(tempFilePath); // Delete original file after processing
        // }

        require("dotenv").config();
        let mediaData;
        if (files) {
            const uploadedData = await uploadFileToCloudinary(files, process.env.FOLDER_NAME);
            console.log("uploadedData : " + JSON.stringify(uploadedData));

            mediaData = {
                url: uploadedData.secure_url,
                format: uploadedData?.resource_type // default type for other files
            };
        }

        const createMessage = {
            sender: req.user.id,
            content: message,
            chat: chatId,
            media: mediaData ? [mediaData] : []
        }

        let newMessage = await Message.create(createMessage)
        // console.log("newMessage : ", newMessage)
        // newMessage = await newMessage.populate("sender", "firstName lastName image email").execPopulate()
        // newMessage = await newMessage.populate("chat").execPopulate()
        // newMessage = await User.populate(newMessage, {
        //     path: "chat.users",
        //     select: "firstName lastName image"
        // })
        // newMessage = await newMessage.populate("sender", "firstName lastName image email").execPopulate();
        // newMessage = await newMessage.populate("chat").execPopulate();
        // newMessage = await User.populate(newMessage, {
        //     path: "chat.users",
        //     select: "firstName lastName image"
        // });

        // newMessage = await Message.findById({ _id: newMessage._id })
        //     .populate("sender", "firstName lastName image email")
        //     .populate("chat")
        //     .exec();

        // newMessage = await User.populate(newMessage, {
        //     path: "chat.users",
        //     select: "firstName lastName image"
        // });

        newMessage = await Message.findById(newMessage._id)
            .populate("sender", "firstName lastName image email")
            .populate({
                path: "chat",
                populate: {
                    path: "users",
                    select: "firstName lastName image"
                }
            })
            .exec();

        // console.log("newMessage after populate : ", newMessage);

        const chatMsg = await Chat.findByIdAndUpdate(chatId, { lastMessage: newMessage });
        // console.log("chatMsg : ", chatMsg);

        return res.status(200)
            .json({
                success: true,
                message: "Message sent successfully",
                data: newMessage,
            })

    } catch (error) {
        console.log("Error in send message: ", error);
        return res.status(500).json({
            success: false,
            message: "Error in sending message"
        });
    }
})

exports.allMessages = asyncHandler(async (req, res) => {
    try {
        const { chatId } = req.body;
        // console.log("chatId : ", chatId)
        const messages = await Message.find({ chat: chatId })
            .populate("sender", "firstName lastName image email")
            .populate("chat");

        // console.log("messages : ", messages);

        return res.json(messages);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
