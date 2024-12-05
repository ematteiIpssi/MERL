import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AdDetails = () => {
    const { id } = useParams(); // Récupère l'ID de l'annonce depuis l'URL
    const [ad, setAd] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/ads/${id}`);
                setAd(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch ad details');
            }
        };

        fetchAdDetails();
    }, [id]);

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    if (!ad) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>{ad.title}</h2>
            <p><strong>Description:</strong> {ad.description}</p>
            <p><strong>Price:</strong> {ad.price}€</p>
            <p><strong>Category:</strong> {ad.category}</p>
            <p><strong>Author:</strong> {ad.author?.username || 'Unknown'}</p>
            <p><strong>Email:</strong> {ad.author?.email || 'No email provided'}</p>
            <p><strong>Posted on:</strong> {new Date(ad.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default AdDetails;
