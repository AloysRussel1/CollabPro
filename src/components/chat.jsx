import React, { useState, useEffect } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]); // Liste des messages
    const [newMessage, setNewMessage] = useState(''); // Nouveau message à envoyer
    const [socket, setSocket] = useState(null); // Instance de WebSocket

    useEffect(() => {
        const chatSocket = new WebSocket('ws://127.0.0.1:8000/ws/chat/');

        chatSocket.onopen = () => {
            console.log('Connecté au serveur WebSocket');
        };

        chatSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.message) {
                setMessages((prevMessages) => [...prevMessages, data.message]); // Ajoute le nouveau message
            }
        };

        chatSocket.onerror = (error) => {
            console.error('Erreur WebSocket:', error);
        };

        chatSocket.onclose = (e) => {
            console.error('WebSocket fermé. Essayez de vous reconnecter', e);
        };

        setSocket(chatSocket); // Stockez l'instance WebSocket pour l'utiliser plus tard

        return () => {
            chatSocket.close(); // Fermez le WebSocket lorsque le composant est démonté
        };
    }, []);

    const sendMessage = () => {
        if (socket && newMessage) {
            try {
                socket.send(JSON.stringify({ message: newMessage }));
                setNewMessage(''); // Réinitialiser l'entrée du message après l'envoi
            } catch (error) {
                console.error('Erreur lors de l\'envoi du message:', error);
            }
        } else {
            console.log("WebSocket non connecté ou message vide");
        }
    };

    return (
        <div>
            <h2>Chat</h2>
            <div style={{ border: '1px solid #ccc', padding: '10px', maxHeight: '300px', overflowY: 'auto' }}>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Tapez votre message..."
            />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
};

export default Chat;
