// import React from 'react'
// import { useState } from 'react'
// import toast from "react-hot-toast"
// import {
//     Modal,
//     ModalOverlay,
//     ModalContent,
//     ModalHeader,
//     ModalFooter,
//     ModalBody,
//     ModalCloseButton,
// } from '@chakra-ui/react'

// import { useDisclosure } from '@chakra-ui/react'
// import { Button } from '@chakra-ui/react'
// import { FormControl, FormLabel, Input } from '@chakra-ui/react'
// import { useSelector } from 'react-redux'
// import { findForCreategroup } from '../../Service/Operation/ChatAPI'

// function CreateGroupModal({ isOpen, onClose }) {
//     const { onOpen } = useDisclosure()

//     const initialRef = React.useRef(null)
//     const finalRef = React.useRef(null)

//     const [search, setSearch] = useState("");

//     const { token } = useSelector((state) => state.auth);
//     const [searchResult, setSearchResult] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const handleSearch = async (query) => {
//         console.log("query : ", query)
//         setSearch(query);
//         if (!query) {
//             setSearchResult([]);
//             return;
//         }

//         setLoading(true);
//         try {
//             const result = await findForCreategroup(query, token);
//             console.log("result : ", result);
//             setSearchResult(result.data);
//         } catch (error) {
//             console.log('Error in handleSearch:', error);
//             toast({
//                 title: 'Error Occurred!',
//                 description: 'Failed to Load the Search Results',
//                 status: 'error',
//                 duration: 5000,
//                 isClosable: true,
//                 position: 'bottom-left',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };


//     return (
//         <>
//             <Modal
//                 initialFocusRef={initialRef}
//                 finalFocusRef={finalRef}
//                 isOpen={isOpen}
//                 onClose={onClose}
//             >
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Create Group</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody pb={6}>
//                         <FormControl>
//                             <FormLabel>Group name</FormLabel>
//                             <Input ref={initialRef} placeholder='Group Name' />
//                         </FormControl>

//                         <FormControl mt={4}>
//                             <FormLabel></FormLabel>
//                             <Input ref={initialRef} placeholder="Add Users eg: John, Piyush, Jane"
//                                 mb={1}
//                                 value={search}
//                                 onChange={(e) => handleSearch(e.target.value)}
//                             />
//                         </FormControl>

//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3}>
//                             Save
//                         </Button>
//                         <Button onClick={onClose}>Cancel</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }

// export default CreateGroupModal;/

import React, { useState, useRef } from 'react';
import toast from "react-hot-toast";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Spinner,
    Box,
    Text,
    Avatar,
    VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { createGroup, findForCreategroup } from '../../Service/Operation/ChatAPI';

function CreateGroupModal({ isOpen, onClose }) {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const { token } = useSelector((state) => state.auth);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [groupUser, setGroupUser] = useState([]);
    const [grName, setGrName] = useState("");

    const handleSearch = async (query) => {
        console.log("query:", query);
        setSearch(query);
        if (!query) {
            setSearchResult([]);
            return;
        }

        setLoading(true);
        try {
            const result = await findForCreategroup(query, token);
            console.log("result:", result);
            setSearchResult(result.data);
        } catch (error) {
            console.log('Error in handleSearch:', error);
            toast.error('Failed to Load the Search Results');
        } finally {
            setLoading(false);
        }
    };

    const handleSetGroup = (userId) => {
        console.log("userId : ", userId)
        groupUser.includes(userId) ? setGroupUser([...groupUser]) : setGroupUser([...groupUser, userId])
        // setGroupUser([...groupUser, userId]);
    }

    const handleChange = (e) => {
        setGrName(e.target.value)
    }


    const handleCreateGroup = async () => {
        console.log("groupUser : ", groupUser)
        try {
            const data = {}
            data.name = grName;
            const allUsers = JSON.stringify(groupUser)
            console.log("allUsers in handleCreateGroup : ", allUsers)
            data.users = allUsers;
            console.log("Data : ", data);
            const result = await createGroup(data, token);
            console.log("result in handleCreateGroup:", result);
            setSearchResult(result?.data?.users);
        } catch (error) {
            console.log('Error in handleSearch:', error);
            toast.error('Failed to Load the Search Results');
        } finally {
            setLoading(false);
        }
    }

    // console.log("Group User : ", JSON.stringify(groupUser));

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create Group</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <FormControl>
                        <FormLabel>Group name</FormLabel>
                        <Input placeholder='Group Name'
                            mb={1}
                            value={grName}
                            onChange={handleChange}
                        />
                    </FormControl>

                    <FormControl mt={4}>
                        <FormLabel>Search Users</FormLabel>
                        <Input
                            placeholder="Add Users eg: John, Piyush, Jane"
                            mb={1}
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </FormControl>

                    {loading ? (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <Spinner />
                        </Box>
                    ) : (
                        <VStack spacing={3} mt={4}>
                            {searchResult?.map((user) => (
                                <Box
                                    key={user._id}
                                    display="flex"
                                    alignItems="center"
                                    width="100%"
                                    p={2}
                                    borderWidth={1}
                                    borderRadius="lg"
                                    cursor={'pointer'}
                                    onClick={() =>
                                        handleSetGroup(user._id)
                                    }
                                >
                                    <Avatar src={user.image} name={`${user.firstName} ${user.lastName}`} />
                                    <Box ml={3}>
                                        <Text fontWeight="bold">
                                            {user.firstName} {user.lastName}
                                        </Text>
                                        <Text fontSize="sm" color="gray.500">
                                            {user.email}
                                        </Text>
                                    </Box>
                                </Box>
                            ))}
                        </VStack>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button
                        onClick={handleCreateGroup}
                        colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default CreateGroupModal;
