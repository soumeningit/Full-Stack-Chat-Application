import React, { useEffect, useState } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { getChat } from "../../Service/Operation/ChatAPI";
import CreateGroupModal from "./CreateGroupModal";
import { useDisclosure } from "@chakra-ui/react";
import { getSender } from "../../utils/GetSender";
import {
  setSearchResults,
  setSelectedChat,
} from "../../redux/Slices/ProfileSlice";
import { useDispatch } from "react-redux";

function MyChat() {
  const { token } = useSelector((state) => state.auth);
  const { searchResults } = useSelector((state) => state.profile);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  console.log("user : ", user);

  async function getAllChat() {
    try {
      const response = await getChat(token);
      console.log("Response in getAllChat : " + response);
      if (response) {
        // Set chats and initialize search results
        // setChats(response.data.data);
        dispatch(setSearchResults(response.data.data));
      }
    } catch (error) {
      console.log("Error in getAllChat : " + error);
    }
  }

  const handleChatClick = (chat) => {
    console.log("chat : ", chat);
    dispatch(setSelectedChat(chat));
  };

  useEffect(() => {
    getAllChat();
  }, []);

  return (
    <div className="bg-[#ffffffec] relative flex flex-col">
      <div>
        <button
          onClick={onOpen}
          className="inline-flex items-center px-4 py-2 mt-2 rounded-md bg-slate-50 absolute right-4 top-4"
        >
          <IoAddCircleOutline className="mr-2 text-xl font-semibold" />
          <span className="text-lg">Create Group</span>
        </button>
      </div>
      <div className="mt-16 gap-y-4">
        {searchResults.length > 0 ? (
          searchResults.map((chat) => (
            <div
              key={chat._id}
              className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleChatClick(chat)}
            >
              <img
                src={chat.users[0]?.image || ""}
                alt={chat.chatName}
                className="rounded-full w-10 h-10"
              />
              <div className="ml-4">
                <div className="font-bold">
                  {chat.isGroupChat
                    ? chat.chatName
                    : getSender(user, chat.users)}
                </div>
                <div className="text-gray-500">
                  {chat.users.map((user) => user.firstName).join(", ")}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-2 text-gray-500">No chats found</div>
        )}
      </div>
      <CreateGroupModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default MyChat;
