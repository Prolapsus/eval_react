import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';

const SignupForm = () => {
    const [credentials, setCredentials] = useState({ id: '', password: '' });
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(credentials);
            setMessageType('success');
            setMessage('Signup successful! Redirecting to login...');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (error) {
            setMessageType('error');
            setMessage('Signup failed. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Signup</h1>
            {message && (
                <div className={`alert alert-${messageType}`}>
                    {message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">Email</label>
                    <input type="email" className="form-control" id="id" name="id" value={credentials.id} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupForm;
