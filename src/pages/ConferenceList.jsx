import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConferences } from '../services/conferenceService';

const ConferenceList = () => {
    const [conferences, setConferences] = useState([]);

    useEffect(() => {
        const fetchConferences = async () => {
            try {
                const data = await getConferences();
                setConferences(data);
            } catch (error) {
                console.error("Error fetching conferences:", error);
            }
        };

        fetchConferences();
    }, []);

    return (
        <div className="container mt-5">
            <h1>Conferences</h1>
            <div className="list-group">
                {conferences.map((conference) => (
                    <Link key={conference._id} to={`/conference/${conference._id}`} className="list-group-item list-group-item-action">
                        {conference.title} - {new Date(conference.date).toLocaleDateString()}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ConferenceList;
