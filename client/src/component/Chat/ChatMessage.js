import React from 'react';
import classNames from 'classnames';

const ChatMessage = ({ message, isSender }) => {
    return (
        <div className={classNames("flex my-2", {
            "justify-end": isSender,
            "justify-start": !isSender,
        })}>
            <div className={classNames("max-w-xs p-2 rounded-lg", {
                "bg-green-300": isSender,
                "bg-white": !isSender,
            })}>
                <p>{message.text}</p>
                <span className="text-xs text-gray-500">{message.time}</span>
            </div>
        </div>
    );
};

export default ChatMessage;
