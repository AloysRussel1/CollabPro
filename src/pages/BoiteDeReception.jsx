// BoiteDeReception.jsx
import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import { FaPaperPlane, FaPlus, FaPaperclip } from 'react-icons/fa';
import './../assets/Css/pagesCss/BoiteDeReception.css'; 

const discussions = [
  { id: '1', title: 'Discussion 1', messages: [{ text: 'Hello', type: 'received' }, { text: 'How are you?', type: 'sent' }] },
  { id: '2', title: 'Discussion 2', messages: [{ text: 'Meeting at 3 PM', type: 'sent' }, { text: 'See you there!', type: 'received' }] },
  // Ajoutez plus de discussions ici
];

const BoiteDeReception = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const handleSelectDiscussion = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleSendMessage = () => {
    if (selectedDiscussion && messageInput.trim()) {
      // Ajoutez la logique pour envoyer le message
      setMessageInput('');
    }
  };

  return (
    <div className="boite-de-reception">
      <header className="boite-header">
        <h1>Messages</h1>
        <Button 
          variant="outlined" 
          color="default" 
          startIcon={<FaPlus />}
          style={{ marginLeft: 'auto', padding: '4px 8px' }} // Bouton plus petit et sans fond
        >
          Nouvelle Discussion
        </Button>
      </header>
      <div className="boite-content">
        <div className="discussions-list">
          <List>
            {discussions.map((discussion) => (
              <ListItem 
                key={discussion.id} 
                button 
                onClick={() => handleSelectDiscussion(discussion)}
                className={`discussion-item ${selectedDiscussion?.id === discussion.id ? 'active' : ''}`}
              >
                <ListItemText primary={discussion.title} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="discussion-detail">
          {selectedDiscussion ? (
            <>
              <div className="messages">
                {selectedDiscussion.messages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`message ${msg.type}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="no-discussion">Sélectionnez une discussion pour voir les messages.</div>
          )}
          <Divider />
          <div className="message-input">
            <IconButton color="default" className="file-upload">
              <FaPaperclip />
            </IconButton>
            <TextField
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Tapez un message"
              className="message-text-field"
            />
            <IconButton onClick={handleSendMessage} color="primary">
              <FaPaperPlane />
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoiteDeReception;
