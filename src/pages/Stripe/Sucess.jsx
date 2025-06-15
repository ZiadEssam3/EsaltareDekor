import React from "react";
import { Link } from "react-router-dom";
import "./Payment.css";

const Success = () => {
    return (
        <div className="success-container">
            <div className="success-checkmark">
                <div className="check-icon">
                    <span className="checkmark">&#10004;</span>
                </div>
            </div>
            <h1 className="success-title">Thank you for your purchase!</h1>
            <p className="success-text">Your payment was successful.</p>
            <p className="success-text">You will receive a confirmation email shortly.</p>

            <Link to="/" className="success-button">Go to Home</Link>
        </div>
    );
};

export default Success;
