import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="container mt-5">
            <h1>Welcome to the Conference Management App</h1>
            <p>Please login or sign up to continue.</p>
            <div className="mt-4">
                <Link to="/login" className="btn btn-primary m-2">Login</Link>
                <Link to="/signup" className="btn btn-secondary m-2">Sign Up</Link>
            </div>
        </div>
    );
};

export default Home;
