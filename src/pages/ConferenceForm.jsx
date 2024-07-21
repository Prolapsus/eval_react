import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createConference, getConference, updateConference } from '../services/conferenceService';
import { useAuth } from '../context/AuthContext';

const ConferenceForm = () => {
    const [conference, setConference] = useState(null);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchConference = async () => {
                try {
                    const data = await getConference(id);
                    setConference(data);
                } catch (error) {
                    console.error("Error fetching conference details:", error);
                } finally {
                    setLoading(false); // Terminer le chargement
                }
            };

            fetchConference();
        } else {
            setConference({
                id: '',
                title: '',
                date: '',
                description: '',
                img: '',
                content: '',
                duration: '',
                osMap: {
                    addressl1: '',
                    addressl2: '',
                    city: '',
                    postalCode: '',
                    coordinates: ''
                },
                speakers: [{ firstname: '', lastname: '' }],
                stakeholders: [{ firstname: '', lastname: '', job: '', img: '' }],
                design: {
                    mainColor: '#000000',
                    secondColor: '#FFFFFF'
                }
            });
            setLoading(false);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'mainColor' || name === 'secondColor') {
            setConference({
                ...conference,
                design: { ...conference.design, [name]: value }
            });
        } else if (name.startsWith('osMap.')) {
            const osMapName = name.split('.')[1];
            setConference({
                ...conference,
                osMap: { ...conference.osMap, [osMapName]: value }
            });
        } else {
            setConference({ ...conference, [name]: value });
        }
    };

    const handleSpeakerChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSpeakers = conference.speakers.map((speaker, i) => {
            if (i === index) {
                return { ...speaker, [name]: value };
            }
            return speaker;
        });
        setConference({ ...conference, speakers: updatedSpeakers });
    };

    const handleStakeholderChange = (index, e) => {
        const { name, value } = e.target;
        const updatedStakeholders = conference.stakeholders.map((stakeholder, i) => {
            if (i === index) {
                return { ...stakeholder, [name]: value };
            }
            return stakeholder;
        });
        setConference({ ...conference, stakeholders: updatedStakeholders });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateConference(id, conference);
            } else {
                await createConference(conference);
            }
            if (currentUser.isAdmin) {
                navigate('/admin/conferences');
            } else {
                navigate('/conferences');
            }
        } catch (error) {
            console.error("Error saving conference:", error);
        }
    };

    const addSpeaker = () => {
        setConference({
            ...conference,
            speakers: [...conference.speakers, { firstname: '', lastname: '' }]
        });
    };

    const removeSpeaker = (index) => {
        setConference({
            ...conference,
            speakers: conference.speakers.filter((_, i) => i !== index)
        });
    };

    const addStakeholder = () => {
        setConference({
            ...conference,
            stakeholders: [...conference.stakeholders, { firstname: '', lastname: '', job: '', img: '' }]
        });
    };

    const removeStakeholder = (index) => {
        setConference({
            ...conference,
            stakeholders: conference.stakeholders.filter((_, i) => i !== index)
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!conference) {
        return <div>Error loading conference data</div>;
    }

    return (
        <div className="container mt-5">
            <h1>{id ? 'Edit Conference' : 'Create Conference'}</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID (Required)</label>
                    <input type="text" className="form-control" id="id" name="id" value={conference.id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title (Required)</label>
                    <input type="text" className="form-control" id="title" name="title" value={conference.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description (Required)</label>
                    <textarea className="form-control" id="description" name="description" value={conference.description} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date (Required)</label>
                    <input type="date" className="form-control" id="date" name="date" value={conference.date} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="img" className="form-label">Image URL (Required)</label>
                    <input type="text" className="form-control" id="img" name="img" value={conference.img} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content (Required)</label>
                    <textarea className="form-control" id="content" name="content" value={conference.content} onChange={handleChange} required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration (Optional)</label>
                    <input type="text" className="form-control" id="duration" name="duration" value={conference.duration} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Speakers (At least one required)</label>
                    {conference.speakers.map((speaker, index) => (
                        <div key={index} className="mb-2">
                            <input type="text" className="form-control mb-1" name="firstname" placeholder="First Name" value={speaker.firstname} onChange={(e) => handleSpeakerChange(index, e)} required />
                            <input type="text" className="form-control mb-1" name="lastname" placeholder="Last Name" value={speaker.lastname} onChange={(e) => handleSpeakerChange(index, e)} required />
                            {conference.speakers.length > 1 && (
                                <button type="button" className="btn btn-danger btn-sm" onClick={() => removeSpeaker(index)}>Remove Speaker</button>
                            )}
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addSpeaker}>Add Speaker</button>
                </div>
                <div className="mb-3">
                    <label className="form-label">Stakeholders (Optional)</label>
                    {conference.stakeholders.map((stakeholder, index) => (
                        <div key={index} className="mb-2">
                            <input type="text" className="form-control mb-1" name="firstname" placeholder="First Name" value={stakeholder.firstname} onChange={(e) => handleStakeholderChange(index, e)} />
                            <input type="text" className="form-control mb-1" name="lastname" placeholder="Last Name" value={stakeholder.lastname} onChange={(e) => handleStakeholderChange(index, e)} />
                            <input type="text" className="form-control mb-1" name="job" placeholder="Job" value={stakeholder.job} onChange={(e) => handleStakeholderChange(index, e)} />
                            <input type="text" className="form-control mb-1" name="img" placeholder="Image URL" value={stakeholder.img} onChange={(e) => handleStakeholderChange(index, e)} />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeStakeholder(index)}>Remove Stakeholder</button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addStakeholder}>Add Stakeholder</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="mainColor" className="form-label">Main Color (Required)</label>
                    <input type="color" className="form-control" id="mainColor" name="mainColor" value={conference.design.mainColor} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="secondColor" className="form-label">Second Color (Required)</label>
                    <input type="color" className="form-control" id="secondColor" name="secondColor" value={conference.design.secondColor} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressl1" className="form-label">Address Line 1 (Optional)</label>
                    <input type="text" className="form-control" id="addressl1" name="osMap.addressl1" value={conference.osMap.addressl1} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="addressl2" className="form-label">Address Line 2 (Optional)</label>
                    <input type="text" className="form-control" id="addressl2" name="osMap.addressl2" value={conference.osMap.addressl2} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">City (Optional)</label>
                    <input type="text" className="form-control" id="city" name="osMap.city" value={conference.osMap.city} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="postalCode" className="form-label">Postal Code (Optional)</label>
                    <input type="text" className="form-control" id="postalCode" name="osMap.postalCode" value={conference.osMap.postalCode} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="coordinates" className="form-label">Coordinates (Optional, format: "lat, long")</label>
                    <input type="text" className="form-control" id="coordinates" name="osMap.coordinates" value={conference.osMap.coordinates} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
};

export default ConferenceForm;
