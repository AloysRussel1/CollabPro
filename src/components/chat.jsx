// src/components/Chat.js
import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/api';
// import './Chat.css';  // Ajouter un fichier CSS pour le style du chat

const Chat = ({ otherUserId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const messagesEndRef = useRef(null);  // Référence pour le défilement automatique
    const userId = localStorage.getItem('userId');

    // Chargement des messages
    useEffect(() => {
        const fetchMessages = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`messages/${otherUserId}/`);
                setMessages(response.data);
            } catch (err) {
                setError("Impossible de charger les messages");
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [otherUserId]);

    // Défilement automatique vers le bas des messages
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // Gestion de l'envoi de message
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
            setMessages([...messages, {
                contenu: newMessage,
                emetteur: { id: userId },
                recepteur: { id: otherUserId },
                date_envoie: new Date()
            }]);
            setNewMessage('');
        } catch (err) {
            setError("Impossible d'envoyer le message");
        }
    };

    return (
        <div className="chat-container">
            <h2>Discussion avec l'utilisateur {otherUserId}</h2>
            {loading ? (
                <p>Chargement des messages...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <div>
                    <div className="messages-list">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message ${message.emetteur.id === userId ? 'sent' : 'received'}`}
                            >
                                <p><strong>{message.emetteur.id === userId ? 'Vous' : "L'autre utilisateur"}:</strong> {message.contenu}</p>
                                <small>{new Date(message.date_envoie).toLocaleString()}</small>
                            </div>
                        ))}
                        <div ref={messagesEndRef}></div>  {/* Élément pour le défilement automatique */}
                    </div>
                    <form onSubmit={handleSendMessage} className="message-form">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Tapez votre message..."
                            rows="3"
                        ></textarea>
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Chat;
