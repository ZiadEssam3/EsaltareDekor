import React from 'react';
import './AccessDenied.css';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
    return (
        <div className="access-denied-container">
            <div className="access-denied-card">
                <h1 className="access-denied-title">403 - Access Denied</h1>
                <p className="access-denied-message">
                    Sorry, you don’t have permission to access this page.
                </p>
                <Link to="/" className="access-denied-button">
                    Return to Homepage
                </Link>
            </div>
        </div>
    );
};

export default AccessDenied;
