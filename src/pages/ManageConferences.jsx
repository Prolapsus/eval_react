import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConferences, deleteConference } from '../services/conferenceService';

const ManageConferences = () => {
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

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this conference?')) {
            return;
        }

        try {
            await deleteConference(id);
            setConferences(conferences.filter(conference => conference.id !== id));
        } catch (error) {
            console.error("Failed to delete conference:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Manage Conferences</h1>
            <Link to="/admin/conference/create" className="btn btn-primary mb-3">Create New Conference</Link>
            <div className="list-group">
                {conferences.map((conference) => (
                    <div key={conference.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {conference.title} - {new Date(conference.date).toLocaleDateString()}
                        </div>
                        <div>
                            <Link to={`/admin/conference/edit/${conference.id}`} className="btn btn-secondary btn-sm me-2">Edit</Link>
                            <button onClick={() => handleDelete(conference.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageConferences;
