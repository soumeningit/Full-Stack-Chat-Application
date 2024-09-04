import React from 'react'
import { useState } from 'react';

import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, Button
}
    from '@chakra-ui/react';

import { useSelector } from 'react-redux';
import { updateUserDetailsAPI } from '../Service/Operation/UserAPI'
import { setUser } from '../redux/Slices/ProfileSlice';


function ProfileImage() {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth)

    console.log("user : ", user);

    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setimageUrl] = useState(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const uploadFile = async (event) => {
        event.preventDefault();
        if (image) {
            const formData = new FormData();
            formData.append('image', image);
            closeModal();
            try {
                const response = await updateUserDetailsAPI(formData, token);
                console.log(response);
                setimageUrl(response?.data?.image);
                const updatedUserDetails = JSON.stringify(response?.data);
                console.log("updatedUserDetails : ", updatedUserDetails);
                localStorage.setItem("user", updatedUserDetails);
                setUser(response);
            } catch (error) {
                console.error("Update profile failed : ", error);
            }
        }

    }

    console.log("image : ", image);

    return (
        <>
            <div className="flex items-center">
                <img
                    src={user?.image}
                    alt="profile"
                    onClick={openModal}
                    className="w-10 h-10 rounded-full cursor-pointer r-0 translate-x-40"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                {isHovered && (
                    <div className="bg-gray-800 text-white text-sm rounded-lg p-2">
                        Click to Change Profile Picture
                    </div>
                )}
            </div>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Select a new Picture</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <input type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="block w-full text-sm text-gray-700 placeholder-gray-400 border border-gray-300 rounded-lg py-2 pl-10 focus:outline-none focus:ring-2 
                            focus:ring-blue-600 focus:border-transparent"
                            placeholder="Upload a picture"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}
                            onClick={uploadFile}
                        >
                            Save
                        </Button>
                        <Button onClick={closeModal}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ProfileImage