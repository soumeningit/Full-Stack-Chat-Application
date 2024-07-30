import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../component/Chat/Navbar';
import SideDrawer from '../component/Chat/SideDrawer';
import MyChat from '../component/Chat/MyChat';
import ChatSection from '../component/Chat/ChatSection';

function ChatPage() {
    const { token } = useSelector((state) => state.auth);
    const { view } = useSelector((state) => state.profile);

    return (
        <div className="relative min-h-screen">
            {token && <Navbar />}
            {view && <SideDrawer isOpen={view} />}
            <div className='flex flex-row h-full'>
                <div className='w-1/3 h-full'>
                    <MyChat />
                </div>
                <div className='w-2/3 h-full'>
                    <ChatSection />
                </div>
            </div>

        </div>
    );
}

export default ChatPage;
