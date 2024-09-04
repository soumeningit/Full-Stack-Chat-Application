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
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
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
    const [groupUsers, setGroupUsers] = useState([]);

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

    const handleSetGroup = (user) => {
        console.log("Clicked in add in group")
        console.log("userId : ", user._id)
        if (!groupUsers.some((u) => u._id === user._id)) {
            setGroupUsers([...groupUsers, user]);
        }
    }

    const handleChange = (e) => {
        setGrName(e.target.value)
    }


    const handleCreateGroup = async () => {
        console.log("groupUser : ", groupUser)
        try {
            const data = {
                name: grName,
                users: groupUsers.map((user) => user._id),
            };
            console.log("Data : ", data);
            const result = await createGroup(data, token);
            console.log("result in handleCreateGroup:", result);
            setSearchResult(result?.data?.users);
            onClose();
        } catch (error) {
            console.log('Error in handleSearch:', error);
            toast.error('Failed to Load the Search Results');
        } finally {
            setLoading(false);
        }
    }

    const handleRemoveGroupUser = (userId) => {
        setGroupUsers(groupUsers.filter((user) => user._id !== userId));
    };


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

                    <Box mt={4}>
                        {groupUsers.map((user) => (
                            <HStack key={user._id} mb={2}>
                                <Avatar src={user.image} name={`${user.firstName} ${user.lastName}`} size="sm" />
                                <Text>{user.firstName} {user.lastName}</Text>
                                <IconButton
                                    icon={<CloseIcon />}
                                    size="xs"
                                    onClick={() => handleRemoveGroupUser(user._id)}
                                />
                            </HStack>
                        ))}
                    </Box>
                    <FormControl mt={4}>
                        <FormLabel>Search Users</FormLabel>
                        <Input
                            placeholder="Add Users : Soumen , John"
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
                        // searching during creation of group
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
                                        handleSetGroup(user)
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
