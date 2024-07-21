import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser, changeUserType } from '../services/userService';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) {
            return;
        }

        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
            setMessage('User deleted successfully.');
        } catch (error) {
            console.error("Failed to delete user:", error);
            setMessage('Failed to delete user.');
        }
    };

    const handlePromote = async (id) => {
        try {
            await changeUserType(id, 'admin');
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setMessage('User promoted to admin successfully.');
        } catch (error) {
            console.error("Failed to promote user:", error);
            setMessage('Failed to promote user.');
        }
    };

    const handleDemote = async (id) => {
        try {
            await changeUserType(id, 'user');
            const updatedUsers = await getUsers();
            setUsers(updatedUsers);
            setMessage('Admin demoted to user successfully.');
        } catch (error) {
            console.error("Failed to demote admin:", error);
            setMessage('Failed to demote admin.');
        }
    };

    return (
        <div className="container mt-5">
            <h1>Manage Users</h1>
            {message && <div className="alert alert-info">{message}</div>}
            <div className="list-group">
                {users.map((user) => (
                    <div key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            {user.id} - {user.type}
                        </div>
                        <div>
                            {user.type !== 'admin' && (
                                <button onClick={() => handlePromote(user.id)} className="btn btn-primary btn-sm me-2">Promote to Admin</button>
                            )}
                            {user.type === 'admin' && (
                                <button onClick={() => handleDemote(user.id)} className="btn btn-secondary btn-sm me-2">Demote to User</button>
                            )}
                            <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;
