import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { getSender } from "../../utils/GetSender";
import { getMessage, sendMessage } from "../../Service/Operation/MessageApi";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const ChatSection = () => {
    const { selectedChat } = useSelector((state) => state.profile);
    const [messages, setMessages] = useState([]);
    const [name, setName] = useState("");
    const { token } = useSelector((state) => state.auth);
    const [allChat, setAllChat] = useState([]);
    const [socketConnected, setSocketConnected] = useState(false);

    console.log("selectedChat : ", selectedChat);

    const { user } = useSelector((state) => state.profile);
    // console.log("user :" + user);

    const fetchChat = async () => {
        // if (!selectedChat?._id) return;
        const data = {};
        data.chatId = selectedChat?._id;
        // console.log("chatId in chatSection : ", data);

        try {
            const chatResponse = await getMessage(data, token);
            setAllChat(chatResponse);

            socket.emit("join chat", selectedChat?._id);
        } catch (error) {
            console.error("Fetch Chat Failed For " + error);
            console.log(error);
        }
    };

    const handleSendMessage = async (text) => {
        const newMessage = {
            text,
            time: new Date().toISOString(),
            sender: { _id: user._id }, // Adding sender info
        };
        setMessages([...messages, newMessage]); // Update local messages
        // setMessages(newMessage);

        // Send the message to the server
        try {
            const data = {};
            data.chatId = selectedChat._id;
            data.message = newMessage.text;
            // console.log("data in sendMessage : ", data);
            const sendMessageResponse = await sendMessage(data, token);
            // console.log("sendMessageResponse" + sendMessageResponse);

            socket.emit("new message", sendMessageResponse);
            setMessages([...messages, sendMessageResponse]);
        } catch (error) {
            console.error("Send Chat Failed " + error);
            console.log(error);
        }
    };

    useEffect(() => {
        if (selectedChat) {
            if (selectedChat.isGroupChat) {
                setName(selectedChat.chatName);
            } else {
                setName(getSender(user, selectedChat.users));
            }
        }
        fetchChat();
        // console.log("selectedChatCompare : " + JSON.stringify(selectedChatCompare));
    }, [selectedChat, user]);

    // console.log("name : ", name);
    // console.log("ALl Messages : ", allChat);
    // console.log("messages : ", messages);

    return (
        <div className="flex flex-col h-screen">
            <ChatHeader user={selectedChat} name={name} />
            <div className="flex-1 p-4 overflow-y-scroll">
                {allChat.map((msg) => (
                    <ChatMessage
                        className="overflow-hidden"
                        key={msg._id}
                        message={msg}
                        isSender={msg?.sender?._id === user?._id} // Determine if the message is from the current user
                        isGroupChat={selectedChat?.isGroupChat}
                    />
                ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default ChatSection;
