import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserList = ({ token }) => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(5);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUsers(response.data);
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, [token]);

    // Pagination logic
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(users.length / usersPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
        if (!confirm) {
            return; // Annuler si l'utilisateur clique sur Annuler
        }

        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUsers(users.filter((user) => user._id !== id)); // Mise à jour locale
            alert('Utilisateur supprimé avec succès.');
        } catch (err) {
            console.error('Failed to delete user:', err);
            alert('Échec de la suppression de l\'utilisateur.');
        }
    };

    return (
        <div>
            <h3>Users</h3>
            <div>
                {currentUsers.map((user) => (
                    <div key={user._id} className="card">
                        <p><strong>Username:</strong> {user.username}</p>
                        <p><strong>Email:</strong> {user.email}</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                            <button
                                className="no-floating-button"
                                onClick={() => navigate(`/users/edit/${user._id}`)}
                            >
                                ✎
                            </button>
                            <button
                                className="delete-button"
                                onClick={() => handleDelete(user._id)}
                            >
                                -
                            </button>
                        </div>
                    </div>
                ))}
            </div>

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
        </div>
    );
};

export default UserList;
