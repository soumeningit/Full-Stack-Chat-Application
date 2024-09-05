import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAttachFile } from "react-icons/md";
import { useSelector } from "react-redux";
import io from "socket.io-client";

// const ENDPOINT = "http://localhost:4000";
const ENDPOINT =
  process.env.NODE_ENV === "production"
    ? "https://talk-time-vqvp.onrender.com" // Your production URL
    : "http://localhost:4001"; // Local development URL
let socket;

const ChatInput = ({ onSendMessage, setFile }) => {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  const [fileData, setFileData] = useState(null);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const { user } = useSelector((state) => state.auth);

  const handleSend = (event) => {
    event.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const fileHandle = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFileData(selectedFile);
      setFile(selectedFile);
      console.log(event.target.files[0]);
    }
  };

  const fileSubmit = (event) => {
    event.preventDefault();
    console.log("File : ", fileData);
    if (!fileData) {
      return;
    }
    const reader = new FileReader();
    let data;
    reader.readAsDataURL(fileData);
    reader.onload = () => {
      setimageUrl(reader.result);
      data = reader.result;
      // console.log(data);
      // socket.emit("upload", data);
      console.log("Socket:", socket); // Check if socket is defined here
      // console.log("Data:", data);
      socket.emit("upload", data);
      // socket.emit("new message", data);
      if (socket) {
        socket.emit("upload file", data);
        closeModal();
      } else {
        console.log("Socket is not defined");
      }
    };
  };

  useEffect(() => {
    console.log("Socket Initialising");
    socket = io(ENDPOINT, {
      transports: ["websocket"], // Force WebSocket transport
      withCredentials: true, // Allow credentials to be sent with requests
    });
    console.log("Socket Initialised");
    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("setup", user);
    });
    socket.on("uploaded", (data) => {
      console.log("File uploaded successfully:", data);
    });
    socket.on("file received", (data) => {
      console.log("Received file:", data);
      // setUrl(data);
      // onSendMessage({ url: data.fileName });
      // Handle the received file (display or save)
    });

    return () => {
      socket.disconnect();
      console.log("Disconnected from server");
    };
  }, [user]);

  // console.log("imageurl : ", imageUrl);

  return (
    <>
      <form
        onSubmit={handleSend}
        className="flex items-center border-t border-gray-300 fixed bottom-0 shadow-md z-10 rounded-md mb-2 mr-4 w-full max-w-[62rem] "
      >
        <div className="relative flex items-center flex-row">
          <MdAttachFile
            onClick={() => setIsOpen(true)}
            className="absolute left-2 text-gray-600 cursor-pointer"
          />
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="p-2 pl-10 border border-gray-300 rounded-lg outline-none flex-grow"
          />
        </div>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded-lg">
          Send
        </button>
      </form>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choose File(video/image)</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <input
              type="file"
              onChange={fileHandle}
              name="file"
              className="block w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg py-2 pl-10 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus:border-transparent"
              placeholder="Upload a file"
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={fileSubmit}>
              Save
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div>{imageUrl && <img src={imageUrl} alt="Uploaded File" />}</div>
    </>
  );
};

export default ChatInput;
