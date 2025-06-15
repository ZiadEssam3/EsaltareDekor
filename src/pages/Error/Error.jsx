import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Error.css';

const ErrorPage = () => {
    return (
        <div className="error-page fade-in">
            <FaExclamationTriangle className="error-icon bounce" />
            <h1 className="slide-down">404 - Page Not Found</h1>
            <p className="slide-up">Sorry, the page you're looking for doesn't exist.</p>
        </div>
    );
};

export default ErrorPage;
