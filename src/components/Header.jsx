import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
    const { currentUser, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Conference App</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {currentUser && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                                </li>
                                {currentUser.userType === 'admin' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
                                    </li>
                                )}
                            </>
                        )}
                    </ul>
                </div>
                {currentUser ? (
                    <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
                ) : (
                    <Link className="btn btn-primary" to="/login">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Header;
