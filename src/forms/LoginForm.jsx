import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ id: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(credentials);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error);
            alert("Login failed: " + (error.response ? error.response.data.message : "Network Error"));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="container mt-3">
            <h2>Login</h2>
            <div className="mb-3">
                <label htmlFor="id" className="form-label">User ID (Email)</label>
                <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    value={credentials.id}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
};

export default LoginForm;
