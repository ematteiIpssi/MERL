import React, { useState } from 'react';
import axios from 'axios';
import './auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', formData);
            const { token } = response.data;

            // Stocker le token dans localStorage
            localStorage.setItem('token', token);

            alert('Login successful!');
            window.location.href = '/dashboard'; // Rediriger vers une page protégée
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-box">
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
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
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Login</button>
                    </form>
                    <p className="switch">
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
