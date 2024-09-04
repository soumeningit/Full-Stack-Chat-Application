import React from 'react';
import classNames from 'classnames';

const ChatMessage = ({ message, isSender, isGroupChat }) => {
    // console.log("message in ChatMessage:", message);

    const handleDownload = async (url, fileName) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        a.click();
        URL.revokeObjectURL(a.href);
    };

    return (
        <div className='flex-1 p-4 h-full overflow-y-auto'>
            <div
                className={classNames("flex my-2", {
                    "justify-end": isSender, // Align messages from the sender to the right
                    "justify-start": !isSender, // Align messages from the receiver to the left
                })}
            >
                <div
                    className={classNames("max-w-xs p-2 rounded-lg", {
                        "bg-green-300 text-white": isSender, // Sender message style
                        "bg-gray-200 text-black": !isSender, // Receiver message style
                    })}
                >
                    {
                        isGroupChat ?
                            (
                                <div className="flex flex-wrap flex-col">
                                    <p>{message?.content || message?.text}</p>
                                    <p className='text-base text-orange-400'>{message?.sender?.firstName}{message?.sender?.lastName}</p>
                                </div>
                            ) :
                            (
                                <p>{message?.content || message?.text}</p>
                            )
                    }
                    {message?.media && message?.media[0]?.url && (
                        <div className="mt-2">
                            {message?.media[0].format === "image" ? (
                                <>
                                    <img
                                        src={message?.media[0]?.url}
                                        alt="image"
                                        className="max-w-full h-auto rounded-md"
                                    />
                                    <button
                                        onClick={() => handleDownload(message?.media[0]?.url, 'image.jpg')}
                                        className="text-blue-500 mt-2 block text-center"
                                    >
                                        Download Image
                                    </button>
                                </>
                            ) : (
                                <>
                                    <video
                                        src={message?.media[0]?.url}
                                        controls
                                        className="max-w-full h-auto rounded-md"
                                    />
                                    <button
                                        onClick={() => handleDownload(message?.media[0]?.url, 'video.mp4')}
                                        className="text-blue-500 mt-2 block text-center"
                                    >
                                        Download Video
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ChatMessage;