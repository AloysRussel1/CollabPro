// BoiteDeReception.jsx
import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import { FaPaperPlane, FaPlus, FaPaperclip, FaSearch } from 'react-icons/fa';
import './../assets/Css/pagesCss/BoiteDeReception.css';

const discussions = [
  {
    id: '1', title: 'Discussion 1', messages: [
      { text: 'Hello', type: 'received' },
      { text: 'How are you?', type: 'sent' },
      { text: 'I am good, thanks!', type: 'received' },
      { text: 'What about you?', type: 'sent' },
      { text: 'Doing well too.', type: 'received' }
    ]
  },
  {
    id: '2', title: 'Discussion 2', messages: [
      { text: 'Meeting at 3 PM', type: 'sent' },
      { text: 'See you there!', type: 'received' },
      { text: 'Don\'t forget the documents.', type: 'sent' },
      { text: 'I won\'t. Thanks for reminding me!', type: 'received' },
      { text: 'No problem.', type: 'sent' }
    ]
  },
  {
    id: '3', title: 'Discussion 3', messages: [
      { text: 'Are you free this weekend?', type: 'received' },
      { text: 'Yes, I am. What\'s up?', type: 'sent' },
      { text: 'Let\'s plan a trip.', type: 'received' },
      { text: 'Sounds great! Where to?', type: 'sent' },
      { text: 'How about the mountains?', type: 'received' }
    ]
  },
  {
    id: '4', title: 'Discussion 4', messages: [
      { text: 'Can you review my code?', type: 'sent' },
      { text: 'Sure, I will check it tonight.', type: 'received' },
      { text: 'Thanks!', type: 'sent' },
      { text: 'No worries.', type: 'received' },
      { text: 'Let me know if you need help.', type: 'received' }
    ]
  },
  {
    id: '5', title: 'Discussion 5', messages: [
      { text: 'The meeting is postponed.', type: 'received' },
      { text: 'To when?', type: 'sent' },
      { text: 'Next Monday.', type: 'received' },
      { text: 'Noted.', type: 'sent' },
      { text: 'Please inform the others.', type: 'received' }
    ]
  }
];

const BoiteDeReception = () => {
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectDiscussion = (discussion) => {
    setSelectedDiscussion(discussion);
  };

  const handleSendMessage = () => {
    if (selectedDiscussion && messageInput.trim()) {
      const updatedDiscussion = {
        ...selectedDiscussion,
        messages: [...selectedDiscussion.messages, { text: messageInput, type: 'sent' }]
      };
      const updatedDiscussions = discussions.map(discussion =>
        discussion.id === selectedDiscussion.id ? updatedDiscussion : discussion
      );
      setSelectedDiscussion(updatedDiscussion);
      setMessageInput('');
    }
  };

  const filteredDiscussions = discussions.filter(discussion =>
    discussion.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="boite-de-reception">
      <header className="boite-header">
        <h1>Messages</h1>
        <Button
          variant="outlined"
          color="default"
          startIcon={<FaPlus />}
          style={{ marginLeft: 'auto', padding: '4px 4px', width: '200px' }}
        >
          Nouvelle Discussion
        </Button>
      </header>
      <div className="boite-content">
        <div className="discussions-list">
          <div className="search-bar">
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Rechercher"
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" color="inherit" aria-label="search">
                    <FaSearch />
                  </IconButton>
                ),
              }}
              style={{ width: '100%' }} // Pour que la barre de recherche occupe toute la largeur
            />
          </div>
          <List>
            {filteredDiscussions.map((discussion) => (
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
              <Divider />
              <div className="message-input" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <TextField
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  variant="outlined"
                  size="small"
                  placeholder="Tapez votre message ici"
                  className="message-text-field"
                  style={{ flex: 9 }} // Prend 90% de la largeur
                />
                <IconButton
                  onClick={handleSendMessage}
                  className="send-button"
                  style={{ flex: 1 }} // Prend 10% de la largeur
                >
                  <FaPaperPlane />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="no-discussion">Sélectionnez une discussion pour voir les messages.</div>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default BoiteDeReception;
