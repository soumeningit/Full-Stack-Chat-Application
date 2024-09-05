import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { getSender } from "../../utils/GetSender";
import { getMessage, sendMessage } from "../../Service/Operation/MessageApi";
import io from "socket.io-client";
import "./ChatSection.css";
import { setNotification } from "../../redux/Slices/ProfileSlice";

// const ENDPOINT = "http://localhost:4001";
const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://talk-time-vqvp.onrender.com" // Your production URL
    : "http://localhost:4001"; // Local development URL
let socket;

const ChatSection = () => {
  const { selectedChat } = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const { token } = useSelector((state) => state.auth);
  const [socketConnected, setSocketConnected] = useState(false);
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);

  const { user } = useSelector((state) => state.profile);
  const { notification } = useSelector((state) => state.profile);

  const fetchChat = async () => {
    // console.log(
    //   "selectedChat inside fetch chat function : " +
    //     JSON.stringify(selectedChat)
    // );
    const data = { chatId: selectedChat?._id };

    try {
      const chatResponse = await getMessage(data, token);
      console.log("chatResponse : ", chatResponse);
      setMessages(chatResponse);
      socket.emit("join chat", selectedChat?._id);
    } catch (error) {
      console.error("Fetch Chat Failed", error);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket"], // Force WebSocket transport
      withCredentials: true, // Allow credentials to be sent with requests
    });
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, [user]);

  useEffect(() => {
    if (selectedChat) {
      if (selectedChat.isGroupChat) {
        setName(selectedChat.chatName);
      } else {
        setName(getSender(user, selectedChat.users));
      }
      fetchChat();
      socket.emit("join chat", selectedChat?._id);
    }
  }, [selectedChat, user]);

  // useEffect(() => {
  //   socket.on("message received", (newMessageReceived) => {
  //     console.log("message in client side : ", newMessageReceived);
  //     if (
  //       !selectedChat ||
  //       selectedChat?._id !== newMessageReceived?.chat?._id
  //     ) {
  //       // give notification
  //     } else {
  //       // setMessages((prevMessages) => [...prevMessages, newMessageReceived]);
  //       // setMessages(...messages, newMessageReceived);
  //       setMessages((prevMessages) =>
  //         prevMessages
  //           ? [...prevMessages, newMessageReceived]
  //           : [newMessageReceived]
  //       );
  //     }
  //   });
  // });

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChat ||
        selectedChat?._id !== newMessageReceived?.chat?._id
      ) {
        // give notification
        if (!notification.includes(newMessageReceived)) {
          setNotification([...notification, newMessageReceived]);
        }
      } else {
        setMessages((prevMessages) =>
          prevMessages
            ? [...prevMessages, newMessageReceived]
            : [newMessageReceived]
        );
      }
    });
  }, [selectedChat]);

  const handleSendMessage = async (text) => {
    const newMessage = {
      text,
      sender: { _id: user?._id },
      chat: { _id: selectedChat?._id },
      files: file,
      // url,
    };
    setMessages((prevMessages) =>
      prevMessages ? [...prevMessages, newMessage] : [newMessage]
    );
    try {
      const formData = new FormData();
      formData.append("chatId", selectedChat?._id);
      formData.append("message", text);
      if (file) {
        formData.append("file", file);
      } else {
        formData.append("file", null);
      }
      // formData.append("file", file);
      // const data = {
      //   chatId: selectedChat?._id,
      //   message: text,
      //   file: file,
      // url,
      // };
      console.log(
        "Data before calling sendMessage in chat section : ",
        formData
      );
      const sendMessageResponse = await sendMessage(formData, token);
      console.log("sendMessageResponse : ", sendMessageResponse);
      socket.emit("new message", sendMessageResponse.data);
    } catch (error) {
      console.error("Send Chat Failed", error);
    }
  };

  // console.log("messages : ", messages);
  // console.log("url in chatSection : ", url);
  // console.log("File in chatSection : ", file);
  console.log("Notification : ", notification);

  return (
    <div>
      {selectedChat ? (
        <>
          <ChatHeader user={selectedChat} name={name} />

          <div className="flex-1 overflow-y-auto p-4 pb-20">
            {messages?.map((msg, i) => (
              <ChatMessage
                key={i}
                message={msg}
                isSender={msg?.sender?._id === user?._id}
                isGroupChat={selectedChat?.isGroupChat}
              />
            ))}
          </div>

          <ChatInput onSendMessage={handleSendMessage} setFile={setFile} />
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl font-bold">Select a chat to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
