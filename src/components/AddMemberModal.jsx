import React, { useState } from 'react';
import './../assets/Css/componentsCss/AddMemberModal.css'; 
import api from '../api/api';

const AddMemberModal = ({ projectId, onMemberAdded, closeModal }) => {

    <h1>Ajouter un membre</h1>
    // const [memberData, setMemberData] = useState({
    //     email: '',
    //     role: '',
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setMemberData({
    //         ...memberData,
    //         [name]: value,
    //     });
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         // Envoyer les données au backend pour ajout au projet
    //         await api.post(`/projets/${projectId}/membres/`, memberData);

    //         // Réinitialiser le formulaire
    //         setMemberData({
    //             email: '',
    //             role: '',
    //         });

    //         // Informer le parent et fermer le modal
    //         onMemberAdded();
    //         closeModal();
    //     } catch (error) {
    //         console.error('Erreur lors de l\'ajout du membre:', error);
    //     }
    // };

    // return (
    //     <div className="modal-overlay">
    //         <div className="modal-content">
    //             <h2>Ajouter un membre</h2>
    //             <form onSubmit={handleSubmit} className="add-member-form">
    //                 <div className="form-group">
    //                     <label htmlFor="email">Email du membre</label>
    //                     <input
    //                         type="email"
    //                         id="email"
    //                         name="email"
    //                         value={memberData.email}
    //                         onChange={handleInputChange}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="form-group">
    //                     <label htmlFor="role">Rôle du membre</label>
    //                     <input
    //                         type="text"
    //                         id="role"
    //                         name="role"
    //                         value={memberData.role}
    //                         onChange={handleInputChange}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="buttons">
    //                     <button type="submit" className="submit-btn">Ajouter</button>
    //                     <button type="button" className="cancel-btn" onClick={closeModal}>Annuler</button>
    //                 </div>
    //             </form>
    //         </div>
    //     </div>
    // );
};

export default AddMemberModal;
