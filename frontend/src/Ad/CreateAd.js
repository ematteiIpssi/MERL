import React, { useState } from 'react';
import axios from 'axios';

const CreateAd = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
    });
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('token');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setMessage(null);

        try {
            await axios.post('http://localhost:5000/api/ads', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMessage('Ad created successfully!');
            setFormData({
                title: '',
                description: '',
                price: '',
                category: '',
            });
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create ad');
        }
    };

    return (
        <div className="container">
            <h2>Create an Ad</h2>

            {/* Message de succès ou d'erreur */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Formulaire */}
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
                <button type="submit">Create Ad</button>
            </form>
        </div>
    );
};

export default CreateAd;
