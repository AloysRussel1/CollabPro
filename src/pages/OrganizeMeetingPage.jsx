import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrganizeMeetingPage = () => {
    const { projectId } = useParams(); // Récupérer l'ID du projet depuis l'URL
    const [meetingUrl, setMeetingUrl] = useState('');

    useEffect(() => {
        // Logique pour générer l'URL de la réunion basée sur le projet (par exemple)
        const url = `https://meet.jit.si/${projectId}-meeting`;
        setMeetingUrl(url);
    }, [projectId]);

    return (
        <div className="meeting-container">
            <div className="meeting-frame">
                <iframe
                    src={meetingUrl}
                    width="100%"
                    height="800px"
                    frameBorder="0"
                    allow="camera; microphone; fullscreen; display-capture"
                    title="Réunion Jitsi"
                ></iframe>
            </div>
        </div>
    );
};

export default OrganizeMeetingPage;
