import React from 'react';
import { useSelector } from 'react-redux';
import LayoutPage from './Layout';
import SideDrawer from '../component/Chat/SideDrawer';

function ChatPage() {
    const { token } = useSelector((state) => state.auth);
    const { view } = useSelector((state) => state.profile);

    return (
        // <div className="relative overflow-hidden h-full">
        //     {token && <Navbar />}
        //     {view && <SideDrawer isOpen={view} />}
        //     <div className='flex flex-row'>
        //         <div className='w-1/3'>
        //             <MyChat />
        //         </div>
        //         <div className='w-2/3 h-full'>
        //             <ChatSection />
        //         </div>
        //     </div>

        // </div>

        <div className="relative overflow-hidden h-full">
            <LayoutPage />
            {view && <SideDrawer isOpen={view} />}
            {/* {token && <Navbar />}
            {view && <SideDrawer isOpen={view} />}
            <div className="flex flex-row h-full w-full">
                <div className="w-1/3 h-full overflow-y-auto">
                    <MyChat />
                </div>
                <div className="w-2/3 h-full flex flex-col">
                    <ChatSection />
                </div>
            </div> */}
        </div>
    );
}

export default ChatPage;
