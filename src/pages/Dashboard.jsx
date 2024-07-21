import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConferences } from '../services/conferenceService';

const Dashboard = () => {
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
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard. Here's the list of conferences:</p>
            <div className="list-group">
                {conferences.map((conference) => (
                    <Link key={conference.id} to={`/conference/${conference.id}`} className="list-group-item list-group-item-action">
                        {conference.title} - {new Date(conference.date).toLocaleDateString()}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
