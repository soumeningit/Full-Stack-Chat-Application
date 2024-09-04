import React, { useState } from 'react';
import { createChat, searchUser } from '../../Service/Operation/ChatAPI';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setSearchResults } from '../../redux/Slices/ProfileSlice';

const UserSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [chat, setChat] = useState([])

    const { token } = useSelector((state) => state.auth);

    const dispatch = useDispatch();

    const handleSearch = async () => {
        if (!searchTerm) {
            setUsers([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = { firstName: searchTerm, lastName: searchTerm };
            console.log("data : ", data)
            const response = await searchUser(data, token);
            console.log("response : ", response)
            if (!response) {
                throw new Error('Network response was not ok');
            }
            // const value = await response.json();
            // console.log("value : ", value)
            // setUsers(value.data);
            setSearchResults(response?.data)

            setUsers(response?.data)
        } catch (err) {
            setError('An error occurred while fetching users.');
        } finally {
            setLoading(false);
        }
    };

    async function handleCreateChat(userId) {
        console.log("userId :", userId)
        try {
            const data = {};
            data.userId = userId;
            console.log("userId in create chat : ", data);
            const response = await createChat(data, token);
            console.log("response : ", response)
            if (!response) {
                throw new Error('Network response was not ok');
            }
            setChat(response?.data)

        } catch (err) {
            setError('An error occurred while fetching users.');
        } finally {
            setLoading(false);
        }
    }

    console.log("Chat in search User : ", chat)

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
            />
            <button onClick={handleSearch} disabled={loading} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                {loading ? 'Searching...' : 'Search'}
            </button>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* <div className="mt-4">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user._id}>
                            <img src={user?.image} alt="user-img" />
                            <p>{user.firstName}</p>
                            <p>{user.lastName}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </div> */}

            <div
                className="mt-4 space-y-4 text-wrap">
                {users.length > 0 ? (
                    users.map((user) => (
                        <div
                            onClick={() => handleCreateChat(user._id)}
                            key={user._id} className="flex items-center p-4 border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 cursor-pointer">
                            <img
                                src={user?.image}
                                alt="user-img"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="ml-4">
                                <p className="font-semibold text-lg">{user.firstName} {user.lastName}</p>
                                <p className="text-gray-500">{user.email}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No users found.</p>
                )}
            </div>
        </div>
    );
};

export default UserSearch;
