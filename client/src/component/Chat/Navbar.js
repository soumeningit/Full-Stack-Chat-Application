// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { setView, setSearchResults } from '../../redux/Slices/ProfileSlice';

// function Navbar() {
//     const dispatch = useDispatch();
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = () => {
//         // For demonstration purposes, we're using static data
//         const results = [
//             'Search result 1',
//             'Search result 2',
//             'Search result 3'
//         ];
//         dispatch(setSearchResults(results));
//         dispatch(setView(true));
//     };

//     return (
//         <nav className="bg-white h-14 shadow-md border-b border-gray-200 flex justify-between items-center px-4">
//             <div className="flex items-center">
//                 <input
//                     type="text"
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-64 px-2 py-1 border border-gray-300 rounded-md focus:outline-none"
//                     placeholder="Search..."
//                 />
//                 <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
//                     Search
//                 </button>
//             </div>
//             <div>
//                 <img
//                     src="https://via.placeholder.com/40"
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full"
//                 />
//             </div>
//         </nav>
//     );
// }

// export default Navbar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../redux/Slices/ProfileSlice';
import { FaSearch } from 'react-icons/fa';

function Navbar() {
    const dispatch = useDispatch();
    const isDrawerOpen = useSelector((state) => state.profile.view);

    const handleSearchClick = () => {
        dispatch(setView(true));
    };

    return (
        <nav className="bg-white h-14 shadow-md border-b border-gray-200 flex justify-between items-center px-4">
            <div className="flex items-center">
                <button onClick={handleSearchClick} className="p-2 bg-blue-500 text-white rounded-md">
                    <FaSearch />
                </button>
                <p>Search User Here</p>
            </div>
            <div>
                <img
                    src="https://via.placeholder.com/40"
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                />
            </div>
        </nav>
    );
}

export default Navbar;
