// src/pages/ChatPage.js
import React from 'react';
import Chat from './chat';

const ChatPage = () => {
    const otherUserId = 2; 
    return (
        <div>
            <h1>Page de Chat</h1>
            <Chat otherUserId={otherUserId} />
        </div>
    );
};

export default ChatPage;
