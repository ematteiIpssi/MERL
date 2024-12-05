import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditUser = ({ token }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '', // Nouveau champ pour le mot de passe
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData({
                    username: response.data.username,
                    email: response.data.email,
                    password: '', // Champ vide par défaut
                });
            } catch (err) {
                setError('Failed to fetch user details');
            }
        };

        fetchUser();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axios.put(`http://localhost:5000/api/users/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert('Utilisateur modifié avec succès.');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update user');
        }
    };

    return (
        <div className="container">
            <h2>Edit User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="New Password (leave blank to keep existing)"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="submit">Update User</button>
            </form>
        </div>
    );
};

export default EditUser;
