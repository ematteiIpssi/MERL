import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdList from './Ad/AdList';
import AdDetails from './Ad/AdDetails';
import CreateAd from './Ad/CreateAd';
import Login from './User/Login'; // Page de connexion
import Register from './User/Register'; // Page de connexion
import Navbar from './Navbar/Navbar';
import Dashboard from './dashboard/Dashboard';
import '../src/App.css'
import AdEdit from './Ad/AdEdit';
import EditUser from './User/EditUser';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/users/edit/:id" element={<EditUser token={localStorage.getItem('token')} />} />
                <Route path="/ads/edit/:id" element={<AdEdit />} />
                <Route path="/users" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/" element={<AdList />} />
                <Route path="/ads" element={<AdList />} />
                <Route path="/ads/create" element={<CreateAd />} />
                <Route path="/ads/:id" element={<AdDetails />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
};

export default App;
