import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); 
    };

    return (
        <button onClick={handleGoBack} style={styles.button}>
            <ArrowBackIcon style={styles.icon} />
            Retour
        </button>
    );
};

const styles = {
    button: {
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        border: '1px solid #ccc',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#333',
    },
    icon: {
        marginRight: '8px',
    },
};

export default BackButton;
