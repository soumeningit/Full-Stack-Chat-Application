// import React from "react";
// import {
//     Drawer,
//     DrawerBody,
//     DrawerHeader,
//     DrawerOverlay,
//     DrawerContent,
// } from '@chakra-ui/react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setView } from '../../redux/Slices/ProfileSlice';

// function SideDrawer({ isOpen }) {
//     const dispatch = useDispatch();
//     const onClose = () => dispatch(setView(false));
//     const searchResults = useSelector((state) => state.profile.searchResults);

//     return (
//         <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
//             <DrawerOverlay />
//             <DrawerContent>
//                 <DrawerHeader borderBottomWidth="1px">Search Results</DrawerHeader>
//                 <DrawerBody>
//                     {searchResults.length > 0 ? (
//                         searchResults.map((result, index) => (
//                             <p key={index}>{result}</p>
//                         ))
//                     ) : (
//                         <p>No results found</p>
//                     )}
//                 </DrawerBody>
//             </DrawerContent>
//         </Drawer>
//     );
// }

// export default SideDrawer;



import React from 'react';
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setView } from '../../redux/Slices/ProfileSlice';
import UserSearch from './UserSearch';

function SideDrawer() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state) => state.profile.view);
    const onClose = () => dispatch(setView(false));

    return (
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                <DrawerBody>
                    <UserSearch />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

export default SideDrawer;
