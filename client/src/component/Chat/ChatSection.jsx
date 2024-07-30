// // import React from "react";

// // function ChatSection() {
// //   return <div className="">ChatSection</div>;
// // }

// // export default ChatSection;
// import React, { useState } from "react";
// import ChatHeader from "./ChatHeader";
// import ChatMessage from "./ChatMessage";
// import ChatInput from "./ChatInput";

// const dummyMessages = [
//   { id: 1, text: "Hello!", time: "11:31", isSender: false },
//   { id: 2, text: "Hi there!", time: "11:33", isSender: true },
//   { id: 3, text: "How are you?", time: "11:35", isSender: false },
//   { id: 4, text: "I am fine, thank you!", time: "11:36", isSender: true },
// ];

// const ChatSection = () => {
//   const [messages, setMessages] = useState(dummyMessages);

//   const handleSendMessage = (text) => {
//     const newMessage = {
//       id: messages.length + 1,
//       text,
//       time: new Date().toLocaleTimeString([], {
//         hour: "2-digit",
//         minute: "2-digit",
//       }),
//       isSender: true,
//     };
//     setMessages([...messages, newMessage]);
//   };

//   const user = {
//     name: "Soumya Bppimt",
//     image: "https://via.placeholder.com/150",
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <ChatHeader user={user} />
//       <div className="flex-1 p-4 overflow-y-scroll">
//         {messages.map((msg) => (
//           <ChatMessage key={msg.id} message={msg} isSender={msg.isSender} />
//         ))}
//       </div>
//       <ChatInput onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatSection;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { getSender } from "../../utils/GetSender";

const ChatSection = () => {
  const { selectedChat } = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");

  console.log("selectedChat : ", selectedChat);

  const { user } = useSelector((state) => state.profile);

  // useEffect(() => {
  //   // if (selectedChat) {
  //   //   // Fetch messages for the selected chat
  //   //   // Example: const response = await fetchMessagesForChat(selectedChat._id);
  //   //   const dummyMessages = [
  //   //     { id: 1, text: "Hello!", time: "11:31", isSender: false },
  //   //     { id: 2, text: "Hi there!", time: "11:33", isSender: true },
  //   //     { id: 3, text: "How are you?", time: "11:35", isSender: false },
  //   //     { id: 4, text: "I am fine, thank you!", time: "11:36", isSender: true },
  //   //   ];
  //   //   // name = getSender(user, selectedChat?.users);
  //   //   // console.log("users : ", name);
  //   //   // setName(name);
  //   //   setMessages(dummyMessages);
  //   // }

  //   setName(getSender(user, selectedChat?.users));
  //   console.log("users : ", name);
  //   // setName(name);
  // }, []);

  useEffect(() => {
    if (selectedChat) {
      if (selectedChat.isGroupChat) {
        setName(selectedChat.chatName);
      } else {
        setName(getSender(user, selectedChat.users));
      }
      // setName(getSender(user, selectedChat.users));
      // Fetch messages for the selected chat here if needed
      // const fetchedMessages = await fetchMessagesForChat(selectedChat._id);
      // setMessages(fetchedMessages);
    }
  }, [selectedChat, user]);

  const handleSendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
    };
    setMessages([...messages, newMessage]);
  };

  // const user = {
  //   name: "Soumya Bppimt",
  //   image: "https://via.placeholder.com/150",
  // };

  // const users = getSender(user, selectedChat?.users);
  // console.log("users : ", users);

  console.log("name : ", name);

  return (
    <div className="flex flex-col h-screen">
      <ChatHeader user={selectedChat} name={name} />
      <div className="flex-1 p-4 overflow-y-scroll">
        {selectedChat?.users?.map((msg) => (
          <ChatMessage key={msg.id} message={msg} isSender={msg.isSender} />
        ))}
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatSection;
