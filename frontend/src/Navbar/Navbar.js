import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = !!localStorage.getItem('token');

    // Déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login'); // Redirection vers la page de connexion
    };

    return (
        <nav style={styles.navbar}>
            <h2 style={styles.brand}>Les Petites Ads</h2>
            <div style={styles.links}>

                {isLoggedIn ? (
                    <>
                        <Link to="/ads" style={styles.link}>
                            Toutes les Annonces
                        </Link>
                        <Link to="/ads/create" style={styles.link}>
                            Créer une Annonce
                        </Link>
                        <Link to="/users" style={styles.link}>
                            Liste des Utilisateurs
                        </Link>
                        <button onClick={handleLogout} style={styles.button}>
                            Déconnexion
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" style={styles.link}>
                            Inscription
                        </Link>
                        <Link to="/login" style={styles.link}>
                            Connexion
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: '10px 20px',
        color: 'white',
    },
    brand: {
        fontSize: '24px',
    },
    links: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '18px',
    },
    button: {
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        padding: '10px 15px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Navbar;
