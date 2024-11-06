// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import axios from '../api/api';

const Chat = ({ otherUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                // Passer otherUserId directement dans l'URL
                const response = await axios.get(`messages/${otherUserId}/`);
                setMessages(response.data);
                setLoading(false);
            } catch (err) {
                setError('Impossible de charger les messages');
                setLoading(false);
            }
        };

        fetchMessages();
    }, [otherUserId]);

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!newMessage.trim()) return;

        const messageData = {
            contenu: newMessage,
            emetteur: userId,
            recepteur: otherUserId,
        };

        try {
            await axios.post(`messages/${otherUserId}/`, messageData);
            setMessages([...messages, { contenu: newMessage, emetteur: { id: userId }, recepteur: { id: otherUserId }, date_envoie: new Date() }]);
            setNewMessage('');
        } catch (err) {
            setError("Impossible d'envoyer le message");
        }
    };

    return (
        <div>
            <h2>Chat avec l'utilisateur {otherUserId}</h2>
            {loading ? (
                <p>Chargement des messages...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : (
                <div>
                    <div className="messages-list">
                        {messages.map((message) => (
                            <div key={message.id} className="message">
                                <p><strong>{message.emetteur.id === userId ? 'Vous' : "L'autre utilisateur"}:</strong> {message.contenu}</p>
                                <small>{new Date(message.date_envoie).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                    <form onSubmit={handleSendMessage}>
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Tapez votre message..."
                            rows="4"
                            style={{ width: '100%' }}
                        ></textarea>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chat;
