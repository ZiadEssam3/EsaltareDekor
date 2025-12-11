import React from "react";
import "./Payment.css"; 
const Cancel = () => {
    return (
        <div className="cancel-container">
            <div className="cancel-icon-container">
                <span className="cancel-icon">&#10006;</span>
            </div>
            <h1 className="cancel-title">Payment Cancelled</h1>
            <p className="cancel-text">Your payment was not completed.</p>
            <p className="cancel-text">You can try again anytime.</p>
        </div>
    );
};

export default Cancel;
