import React from 'react';
import './SaleCard.css';

const SaleCard = ({ imageSrc, discountText }) => {
    return (
        <div className="sale-card">
            <img src={imageSrc} alt="Product" className="sale-image" />
            <div className="sale-banner">
                {discountText}
            </div>
        </div>
    );
};

export default SaleCard;
