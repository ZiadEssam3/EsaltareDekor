// ErrorPage.jsx
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa'; // Importing an exclamation icon
import './Error.css';

const ErrorPage = () => {
    return (
        <div className="error-page">
            <FaExclamationTriangle className="error-icon" />
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you're looking for doesn't exist.</p>
        </div>
    );
};

export default ErrorPage;
