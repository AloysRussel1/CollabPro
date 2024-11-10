import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, Divider, TextField, IconButton } from '@mui/material';
import { FaPaperPlane, FaPlus, FaSearch } from 'react-icons/fa';
import axios from '../api/api';
import './../assets/Css/pagesCss/BoiteDeReception.css';

const BoiteDeReception = () => {
  const [discussions, setDiscussions] = useState([]);
  const [members, setMembers] = useState([]);  // Liste des membres du projet
  const [selectedMember, setSelectedMember] = useState(null); // Membre sélectionné
  const [selectedDiscussion, setSelectedDiscussion] = useState([]); // Discussion sélectionnée (modifiée en tableau vide)
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem('userId');

  // Charger les membres du projet
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('/membres-projets/');
        // Filtrer les membres pour ne pas inclure l'utilisateur actuel
        setMembers(response.data.filter(member => member.id !== parseInt(userId)));
      } catch (err) {
        console.error("Erreur lors du chargement des membres du projet");
      }
    };
    fetchMembers();
  }, [userId]);

  // Charger la discussion lorsque le membre est sélectionné
  useEffect(() => {
    const fetchDiscussion = async () => {
      if (!selectedMember) return;
      setLoading(true);
      try {
        const response = await axios.get(`/messages/${selectedMember.id}/`);
        console.log("Reponse", response.data);

        // Trier les messages par date (ordre croissant)
        const sortedMessages = response.data.sort((a, b) => new Date(a.date_envoie) - new Date(b.date_envoie));

        // Fusionner les messages envoyés et reçus
        const allMessages = sortedMessages.map(msg => ({
          contenu: msg.contenu,
          date_envoie: msg.date_envoie,
          isSent: msg.emetteur === parseInt(userId), // Pour savoir si le message est envoyé par l'utilisateur
        }));

        // Mettre à jour l'état avec les messages triés et fusionnés
        setSelectedDiscussion(allMessages);
        setLoading(false);
      } catch (err) {
        setError("Impossible de charger la discussion");
        setLoading(false);
      }
    };

    fetchDiscussion();
  }, [selectedMember]);

  const handleSelectMember = (member) => {
    setSelectedMember(member);
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedMember) return;

    const messageData = {
      contenu: messageInput,
      emetteur: userId,
      recepteur: selectedMember.id,
    };

    try {
      // Envoi du message au serveur
      await axios.post(`/messages/${selectedMember.id}/`, messageData);

      // Création d'un nouvel objet message pour simuler l'ajout local
      const newMessage = {
        contenu: messageInput,
        emetteur: { id: userId },
        recepteur: { id: selectedMember.id },
        date_envoie: new Date().toISOString(), // Utiliser le bon format de date
      };

      // Mettre à jour l'état avec le nouveau message ajouté
      setSelectedDiscussion((prevDiscussion) => [
        ...(prevDiscussion || []),
        { ...newMessage, isSent: true },
      ]);

      // Réinitialisation du champ de saisie du message
      setMessageInput('');
    } catch (err) {
      setError("Impossible d'envoyer le message");
    }
  };

  const filteredMembers = members.filter(member =>
    member.nom.toLowerCase().includes(searchTerm.toLowerCase())
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
        <div className="members-list">
          <div className="search-bar">
            <TextField
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              placeholder="Rechercher un membre"
              InputProps={{
                startAdornment: (
                  <IconButton edge="start" color="inherit" aria-label="search">
                    <FaSearch />
                  </IconButton>
                ),
              }}
              style={{ width: '100%' }}
            />
          </div>
          <List>
            {filteredMembers.map((member) => (
              <ListItem
                key={member.id}
                button
                onClick={() => handleSelectMember(member)}
                className={`member-item ${selectedMember?.id === member.id ? 'active' : ''}`}
              >
                <ListItemText primary={member.nom} />
              </ListItem>
            ))}
          </List>
        </div>
        <div className="discussion-detail">
          {loading ? (
            <p>Sélectionnez une discussion pour voir les messages...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : selectedDiscussion && selectedDiscussion.length > 0 ? (
            <>
              <div className="messages">
                {selectedDiscussion.map((msg, index) => (
                  <div
                    key={index}
                    className={`message ${msg.isSent ? 'sent' : 'received'}`}
                  >
                    <p>{msg.contenu}</p>
                    <small>{new Date(msg.date_envoie).toLocaleString()}</small>
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
                  style={{ flex: 9 }}
                />
                <IconButton
                  onClick={handleSendMessage}
                  className="send-button"
                  style={{ flex: 1 }}
                >
                  <FaPaperPlane />
                </IconButton>
              </div>
            </>
          ) : (
            <div className="no-discussion">Sélectionnez un membre pour commencer une discussion.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoiteDeReception;
