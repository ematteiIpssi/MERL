import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const AdList = () => {
    const [ads, setAds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [adsPerPage] = useState(5);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/ads');
                setAds(response.data);
            } catch (err) {
                console.error('Failed to fetch ads:', err);
            }
        };

        fetchAds();
    }, []);

    // Pagination logic
    const indexOfLastAd = currentPage * adsPerPage;
    const indexOfFirstAd = indexOfLastAd - adsPerPage;
    const currentAds = ads.slice(indexOfFirstAd, indexOfLastAd);

    const totalPages = Math.ceil(ads.length / adsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/ads/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setAds(ads.filter((ad) => ad._id !== id)); // Mettre à jour la liste localement
        } catch (err) {
            console.error('Failed to delete ad:', err);
        }
    };

    return (
        <div className="container">
            <h2>Ads List</h2>
            {currentAds.map((ad) => (
                <div key={ad._id} className="card">
                    <h3>{ad.title}</h3>
                    <p>{ad.description}</p>
                    <p><strong>Price:</strong> {ad.price}€</p>
                    <p><strong>Category:</strong> {ad.category}</p>
                    <Link to={`/ads/${ad._id}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                        View Details
                    </Link>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                        <button
                            className="no-floating-button"
                            onClick={() => navigate(`/ads/edit/${ad._id}`)}
                        >
                            ✎
                        </button>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(ad._id)}
                        >
                            -
                        </button>
                    </div>
                </div>
            ))}

            {/* Pagination */}
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>

              {/* Bouton flottant pour créer une annonce */}
              <button className="floating-button" onClick={() => navigate('/ads/create')}>
                +
            </button>
        </div>
    );
};

export default AdList;
