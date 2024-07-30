// import React from 'react';

// const ChatHeader = ({ user, name }) => {
//     console.log("user in chat header : ", user);
//     return (
//         <div className="flex items-center p-4 border-b border-gray-300">
//             <img src={user?.image} alt="profile" className="w-10 h-10 rounded-full" />
//             <div className="ml-4">
//                 <h2 className="text-lg font-semibold">{name}</h2>
//             </div>
//             {
//                 user?.isGroupChat &&
//                 <div className='flex flex-row'>
//                     {
//                         user?.users.map((name, index) => {
//                             return <p key={index}>{name.firstName}{name.lastName}</p>
//                         })
//                     }
//                 </div>
//             }
//         </div>
//     );
// };

// export default ChatHeader;


import React from 'react';

const ChatHeader = ({ user, name }) => {
    console.log("user in chat header : ", user);
    return (
        <div className="flex flex-col p-4 border-b border-gray-300">
            <div className="flex items-center">
                <img src={user?.image} alt="profile" className="w-10 h-10 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    {user?.isGroupChat && (
                        <div className="mt-2 flex flex-row">
                            {user?.users.map((user, index) => (
                                <p key={index} className="text-gray-700">
                                    {user.firstName} {user.lastName}
                                    {", "}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ChatHeader;
