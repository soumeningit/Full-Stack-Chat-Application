// import React from 'react';

// const SideBar = ({ setSelectedChat }) => {
//     const chats = [
//         { id: 1, name: 'User 1', lastMessage: 'Hello', profileImage: 'https://via.placeholder.com/40' },
//         { id: 2, name: 'Group 1', lastMessage: 'Hi there', profileImage: 'https://via.placeholder.com/40' },
//         // Add more chat data here
//     ];

//     return (
//         <div className="w-1/3 bg-gray-100 p-4">
//             <div className="flex items-center mb-4">
//                 <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full cursor-pointer" />
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="ml-4 p-2 border rounded w-full"
//                 />
//             </div>
//             <button className="w-full py-2 bg-blue-500 text-white rounded mb-4">New Message</button>
//             {chats.map(chat => (
//                 <div
//                     key={chat.id}
//                     className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
//                     onClick={() => setSelectedChat(chat)}
//                 >
//                     <img src={chat.profileImage} alt={chat.name} className="rounded-full w-10 h-10" />
//                     <div className="ml-4">
//                         <div className="font-bold">{chat.name}</div>
//                         <div className="text-gray-500">{chat.lastMessage}</div>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default SideBar;


// import React, { useEffect, useState } from 'react';
// import { getChat } from '../../Service/Operation/ChatAPI';
// import { useSelector } from 'react-redux';

// const SideBar = () => {
//     const [searchQuery, setSearchQuery] = useState('');

//     console.log(searchQuery);

//     const { token } = useSelector((state) => state.auth);

//     // const handleSearch = () => {
//     //     if (searchQuery) {
//     //         const results = chats.filter(chat => chat.name.toLowerCase().includes(searchQuery.toLowerCase()));
//     //         setSearchResults(results);
//     //     } else {
//     //         setSearchResults([]);
//     //     }
//     // };

//     function handleSearch(event) {

//     }

// async function getAllChat() {
//     try {
//         const response = await getChat(token);
//         console.log("Response in getAllChat : " + response)
//     } catch (error) {
//         console.log("Error in getAllChat : " + error)
//     }
// }

// useEffect(() => {
//     getAllChat();
// }, [])

//     return (
//         <div className="w-full lg:w-1/3 bg-gray-100 p-4">
//             <div className="flex items-center mb-4">
//                 <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full cursor-pointer" />
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="ml-4 p-2 border rounded w-full"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
//             </div>
//             <button className="w-full py-2 bg-blue-500 text-white rounded mb-4">New Message</button>
// {/* {(searchResults.length > 0 ? searchResults : chats).map(chat => ( */}
// <div
//     // key={chat.id}
//     className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
// // onClick={() => setSelectedChat(chat)}
// >
//     <img src={""} alt={""} className="rounded-full w-10 h-10" />
//     <div className="ml-4">
//         <div className="font-bold">{ }</div>
//         <div className="text-gray-500">{ }</div>
//     </div>
// </div>
// {/* ))} */}
//         </div>
//     );
// };

// export default SideBar;

// import React, { useEffect, useState } from 'react';
// import { getChat } from '../../Service/Operation/ChatAPI';
// import { useSelector } from 'react-redux';

// const SideBar = () => {
//     const [chats, setChats] = useState([]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [searchResults, setSearchResults] = useState([]);

//     const { token } = useSelector((state) => state.auth);

//     async function getAllChat() {
//         try {
//             const response = await getChat(token);
//             if (response) {
//                 setChats(response.data.data);
//                 setSearchResults(response.data.data); // Initialize search results
//             }
//         } catch (error) {
//             console.log("Error in getAllChat : " + error);
//         }
//     }

//     useEffect(() => {
//         getAllChat();
//     }, [token]);

//     function handleSearch() {
//         if (searchQuery) {
//             const results = chats.filter(chat =>
//                 chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setSearchResults(results);
//         } else {
//             setSearchResults(chats);
//         }
//     }

//     return (
//         <div className="w-full lg:w-1/3 bg-gray-100 p-4">
//             <div className="flex items-center mb-4">
//                 <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full cursor-pointer" />
//                 <input
//                     type="text"
//                     placeholder="Search"
//                     className="ml-4 p-2 border rounded w-full"
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
//             </div>
//             <button className="w-full py-2 bg-blue-500 text-white rounded mb-4">New Message</button>
//             {searchResults.length > 0 ? searchResults.map(chat => (
//                 <div
//                     key={chat._id}
//                     className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
//                 // onClick={() => setSelectedChat(chat)}
//                 >
//                     <img src={chat.users[0]?.image || ''} alt={chat.chatName} className="rounded-full w-10 h-10" />
//                     <div className="ml-4">
//                         <div className="font-bold">{chat.chatName}</div>
//                         <div className="text-gray-500">{chat.users.map(user => user.firstName).join(', ')}</div>
//                     </div>
//                 </div>
//             )) : (
//                 <div className="p-2 text-gray-500">No chats found</div>
//             )}
//         </div>
//     );
// };

// export default SideBar;

import React, { useEffect, useState } from 'react';
import { getChat } from '../../Service/Operation/ChatAPI';
import { useSelector } from 'react-redux';

const SideBar = () => {
    // State to store all chat data
    const [chats, setChats] = useState([]);
    // State to store the search query
    const [searchQuery, setSearchQuery] = useState('');
    // State to store search results
    const [searchResults, setSearchResults] = useState([]);
    // State to store the currently selected chat
    const [selectedChat, setSelectedChat] = useState(null);

    // Retrieve the auth token from Redux store
    const { token } = useSelector((state) => state.auth);

    // Function to fetch all chats from the API
    async function getAllChat() {
        try {
            const response = await getChat(token);
            if (response.data.success) {
                // Set chats and initialize search results
                setChats(response.data.data);
                setSearchResults(response.data.data);
            }
        } catch (error) {
            console.log("Error in getAllChat : " + error);
        }
    }

    // Fetch chats when component mounts or token changes
    useEffect(() => {
        getAllChat();
    }, [token]);

    // Function to handle search functionality
    function handleSearch() {
        if (searchQuery) {
            // Filter chats based on search query
            const results = chats.filter(chat =>
                chat.chatName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
        } else {
            // If no search query, show all chats
            setSearchResults(chats);
        }
    }

    return (
        <div className="w-full lg:w-1/3 bg-gray-100 p-4">
            <div className="flex items-center mb-4">
                <img src="https://via.placeholder.com/40" alt="Profile" className="rounded-full cursor-pointer" />
                <input
                    type="text"
                    placeholder="Search"
                    className="ml-4 p-2 border rounded w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white rounded">Search</button>
            </div>
            <button className="w-full py-2 bg-blue-500 text-white rounded mb-4">New Message</button>
            {searchResults.length > 0 ? searchResults.map(chat => (
                <div
                    key={chat._id}
                    className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => setSelectedChat(chat)}
                >
                    <img src={chat.users[0]?.image || ''} alt={chat.chatName} className="rounded-full w-10 h-10" />
                    <div className="ml-4">
                        <div className="font-bold">{chat.chatName}</div>
                        <div className="text-gray-500">{chat.users.map(user => user.firstName).join(', ')}</div>
                    </div>
                </div>
            )) : (
                <div className="p-2 text-gray-500">No chats found</div>
            )}
            {/* Render the selected chat details if a chat is selected */}
            {/* {selectedChat && (
                <div className="mt-4 p-2 bg-gray-200 rounded">
                    <h3 className="font-bold text-lg">Selected Chat</h3>
                    <div className="flex items-center">
                        <img src={selectedChat.users[0]?.image || ''} alt={selectedChat.chatName} className="rounded-full w-12 h-12" />
                        <div className="ml-4">
                            <div className="font-bold">{selectedChat.chatName}</div>
                            <div className="text-gray-500">{selectedChat.users.map(user => user.firstName).join(', ')}</div>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default SideBar;
