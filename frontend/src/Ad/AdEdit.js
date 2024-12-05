import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdEdit = () => {
    const { id } = useParams(); // Récupère l'ID de l'annonce depuis l'URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
    });
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/ads/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData({
                    title: response.data.title,
                    description: response.data.description,
                    price: response.data.price,
                    category: response.data.category,
                });
            } catch (err) {
                setError('Failed to fetch ad details');
            }
        };

        fetchAd();
    }, [id, token]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            await axios.put(`http://localhost:5000/api/ads/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Ad updated successfully!');
            navigate('/ads'); // Rediriger vers la liste des annonces
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update ad');
        }
    };

    return (
        <div className="container">
            <h2>Edit Ad</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {message && <p style={{ color: 'green' }}>{message}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="5"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price (€)"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Category</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Furniture">Furniture</option>
                </select>
                <button type="submit">Update Ad</button>
            </form>
        </div>
    );
};

export default AdEdit;
