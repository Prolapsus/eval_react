import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <div className="d-flex flex-column align-items-start">
                <Link to="/admin/conferences" className="btn btn-primary mb-2">Manage Conferences</Link>
                <Link to="/admin/users" className="btn btn-primary mb-2">Manage Users</Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
