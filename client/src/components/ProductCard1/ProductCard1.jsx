import React from 'react';
import './ProductCard1.css';
import { Link } from 'react-router-dom';

const ProductCard1 = ({ id, category, slug, title, originalPrice, discount, image, bgColor }) => {
    return (
        <div className="product-card" style={{ backgroundColor: bgColor }}>
            <div className="product-category">{category}</div>
            <Link to={`/product/${id}`}>
                <img src={image} alt={title} className="product-image" />
            </Link>
            <p className="product-title">{title}</p>
            <p className="product-original-price">{originalPrice}</p>
            <p className="product-price">{Math.round(originalPrice - (originalPrice * discount / 100))}</p>
        </div>
    );
};

export default ProductCard1;


