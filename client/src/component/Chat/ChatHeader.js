import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Drawer, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, DrawerOverlay, Input, Box, Avatar, Text, Badge, FormLabel, FormControl } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { removeFromGroup, renameChat } from '../../Service/Operation/ChatAPI';
import toast from 'react-hot-toast';
import { BiEdit } from 'react-icons/bi';
import { getProfile } from '../../utils/GetSender';

const ChatHeader = ({ user, name }) => {

    console.log("user in chat header : ", user);

    const [image, setImage] = useState(null);
    const [imageUrl, setimageUrl] = useState(null);
    const [isdrawerOpen, setisdrawerOpen] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [refresh, setRefresh] = useState(null);
    const [isGroupHovered, setIsGroupHovered] = useState(false);
    const [isOpenGrRename, setIsOpenGrRename] = useState(false);

    const userId = useSelector((state) => state?.profile?.user?._id);
    const User = useSelector((state) => state?.profile?.user);
    const groupAdmin = user?.groupAdmin;
    const chatId = user?._id;
    const { token } = useSelector((state) => state.auth);

    console.log("userId : ", userId);

    console.log("Image : ", image);

    const openGroupRenameModal = () => setIsOpenGrRename(true);
    const closeGroupRenameModal = () => setIsOpenGrRename(false);

    const ondrawerClose = () => setisdrawerOpen(false);

    const showAll = () => {
        setisdrawerOpen(true);
    }

    const handleRemoveFromGroup = async (user_id) => {
        console.log("userId : " + userId + "user_id : " + user_id + " groupAdmin : " + groupAdmin);
        if (userId !== groupAdmin) {
            toast.error("You are not the admin for this group.");
            return;
        }
        else {
            try {
                const data = { chatId: chatId, userId: user_id };
                const del_response = await removeFromGroup(data, token);
                // console.log("del_response : " + del_response);
            } catch (e) {
                console.log("Error remove group member" + e);
                console.log(e);
            }
        }
    }

    const handleGroupRename = () => {
        console.log("Group name : " + name);
        openGroupRenameModal();
    }

    const handleGroupNameChange = async () => {
        try {
            const data = { chatId: chatId, name: groupName };
            const rename_response = await renameChat(data, token);
            setRefresh(rename_response)
            // console.log("rename_response : " + rename_response);
        } catch (e) {
            console.log("Error remove group member" + e);
            console.log(e);
        }
    }

    return (
        <>
            <div className="w-full flex flex-col p-4 border-b border-gray-300 sticky top-0 bg-[hsl(0,0%,100%)] z-20">
                {/* <div className="flex flex-col p-4 border-b border-gray-300 sticky top-0 bg-[#d6d3d3c3] z-10"> */}
                <div className="flex items-center">
                    <img
                        src={getProfile(User, user.users)}
                        alt="profile"
                        className="w-10 h-10 rounded-full cursor-pointer"
                    />
                    <div className="ml-4 flex-1">
                        <div className='flex flex-row'>
                            <h2 className="text-lg font-semibold">{name}</h2>
                            {
                                user?.isGroupChat &&
                                <BiEdit
                                    className='mt-1 cursor-pointer'
                                    onMouseEnter={() => setIsGroupHovered(true)}
                                    onMouseLeave={() => setIsGroupHovered(false)}
                                    onClick={handleGroupRename}
                                />
                            }
                            {
                                isGroupHovered &&
                                <div className="absolute bottom-[-30px] left-0 bg-gray-800 text-white text-sm rounded-lg p-2 ">
                                    Click to Change Group Name
                                </div>
                            }
                        </div>
                        {user?.isGroupChat && (
                            console.log("User in Chat Header : ", user),
                            <div className="mt-2 flex flex-wrap">
                                {user?.users.slice(0, 2).map((user, index) => (
                                    <p key={index} className="text-gray-700 mr-1">
                                        {user?.firstName} {user?.lastName}
                                        {index < user?.users?.length - 1 ? ", " : ""}
                                    </p>
                                ))}
                                {user?.users.length > 2 && (
                                    <p
                                        onClick={showAll}
                                        className="text-gray-700 mr-1 cursor-pointer"
                                    >
                                        and {user?.users.length - 2} more...
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Show Group Details */}
            <Drawer
                isOpen={isdrawerOpen}
                placement='right'
                onClose={ondrawerClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Group Members</DrawerHeader>

                    <DrawerBody>
                        {
                            user &&
                            user?.users &&
                            user.users.map((user, id) => {
                                return (
                                    <Box
                                        key={id}
                                        display="flex"
                                        alignItems="center"
                                        p={3}
                                        borderBottom="1px solid #E2E8F0"
                                        _hover={{ backgroundColor: '#EDF2F7' }}
                                    >
                                        <Avatar src={user.image} name='user-img' size="md" />

                                        <Box ml={4}>
                                            <Text fontSize='lg' fontWeight='bold'>
                                                {
                                                    user._id === userId ? ("YOU") : (`${user.firstName}${user.lastName}`)
                                                }
                                                {
                                                    user._id === groupAdmin &&
                                                    <Badge variant='outline' colorScheme='green'
                                                        borderColor='green.500'
                                                        borderRadius='full'
                                                        px={2}
                                                        py={1}
                                                        textTransform='uppercase'
                                                        fontSize='0.75rem'
                                                        fontWeight='bold'
                                                        ml={2}
                                                        _hover={{ backgroundColor: 'green.500', color: 'white' }}
                                                    >
                                                        ADMIN
                                                    </Badge>
                                                }
                                            </Text>
                                            {
                                                user?._id !== userId && user?._id !== groupAdmin &&
                                                <Badge colorScheme='red' cursor="pointer"
                                                    mt={1}
                                                    _hover={{ backgroundColor: '#E53E3E', color: '#FFFFFF' }}
                                                    onClick={() => handleRemoveFromGroup(user?._id)}
                                                >
                                                    Remove from Group
                                                </Badge>
                                            }
                                        </Box>

                                    </Box>
                                )
                            })

                        }
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={ondrawerClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            {/* Change Group Name */}

            <Modal
                isOpen={isOpenGrRename} onClose={closeGroupRenameModal}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enter a new name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Group Name</FormLabel>
                            <Input placeholder={user?.chatName}
                                onChange={(event) => setGroupName(event.target.value)}
                            />
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme='blue' mr={3}
                            onClick={handleGroupNameChange}
                        >
                            Save
                        </Button>
                        <Button onClick={closeGroupRenameModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ChatHeader;
