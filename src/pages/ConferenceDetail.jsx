import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConference } from '../services/conferenceService';

const ConferenceDetail = () => {
    const { id } = useParams();
    const [conference, setConference] = useState(null);

    useEffect(() => {
        const fetchConference = async () => {
            try {
                const data = await getConference(id);
                setConference(data);
            } catch (error) {
                console.error("Error fetching conference details:", error);
            }
        };

        fetchConference();
    }, [id]);

    if (!conference) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            <h1>{conference.title}</h1>
            <p>{conference.description}</p>
            <p>Date: {new Date(conference.date).toLocaleDateString()}</p>
            <p>Duration: {conference.duration}</p>
            <p>Speakers: {conference.speakers.map(speaker => `${speaker.firstname} ${speaker.lastname}`).join(', ')}</p>
            <p>Stakeholders: {conference.stakeholders.map(stakeholder => `${stakeholder.firstname} ${stakeholder.lastname}`).join(', ')}</p>
            <p>Main Color: <span style={{ backgroundColor: conference.design.mainColor, padding: '0 10px' }}>{conference.design.mainColor}</span></p>
            <p>Secondary Color: <span style={{ backgroundColor: conference.design.secondColor, padding: '0 10px' }}>{conference.design.secondColor}</span></p>
            <div>
                <h3>Address</h3>
                <p>{conference.osMap.addressl1}</p>
                <p>{conference.osMap.addressl2}</p>
                <p>{conference.osMap.city}, {conference.osMap.postalCode}</p>
            </div>
        </div>
    );
};

export default ConferenceDetail;
