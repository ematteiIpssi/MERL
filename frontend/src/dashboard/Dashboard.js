import React, { useState } from 'react';
import axios from 'axios';
import UserList from '../User/UserList';

const Dashboard = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    // Gérer la création ou la mise à jour des utilisateurs
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);
        setError(null);

        try {
            if (editId) {
                // Mise à jour (mot de passe non modifiable ici)
                const { username, email } = formData;
                await axios.put(`http://localhost:5000/api/users/${editId}`, { username, email }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage('User updated successfully!');
            } else {
                // Création
                await axios.post('http://localhost:5000/api/users', formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMessage('User created successfully!');
            }

            setFormData({ username: '', email: '', password: '' });
            setEditId(null);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save user');
        }
    };

    // Remplir le formulaire pour l'édition
    const handleEdit = (user) => {
        setFormData({ username: user.username, email: user.email, password: '' });
        setEditId(user._id);
    };

    return (
        <div className="container">
            <h2>Dashboard</h2>

            {/* Formulaire */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
                {!editId && (
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                )}
                <button type="submit">{editId ? 'Update User' : 'Create User'}</button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Liste des utilisateurs */}
            <UserList token={token} />
        </div>
    );
};

export default Dashboard;
