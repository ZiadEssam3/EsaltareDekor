import React from 'react';
import './SuperDeals.css';
import ProductCard1 from '../ProductCard1/ProductCard1';

const SuperDeals = ({ products, bgColor, cardBgColor, title }) => {
    return (
        <div className="super-deals-container" style={{ backgroundColor: bgColor }}>
            <h2 className="super-deals-title">{title}</h2>
            <div className="product-grid">
                {Array.isArray(products) && products.slice(0, 6).map((item, index) => (
                    <ProductCard1
                        key={index}
                        id={item.id}
                        category={item.category}
                        title={item.title}
                        discount={item.discount}
                        originalPrice={item.originalPrice}
                        image={item.image}
                        bgColor={cardBgColor}
                        slug={item.slug}
                    />
                ))}
            </div>
        </div>
    );
};

export default SuperDeals;
