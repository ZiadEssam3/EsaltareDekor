import React, { useEffect, useState } from 'react';
import './SuperDeals.css';
import ProductCard1 from '../ProductCard1/ProductCard1';

const SuperDeals = ({ products, bgColor, cardBgColor, title }) => {
    const baseURL = 'http://127.0.0.1:8000';
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetch(`${baseURL}/api/esaltare/categories`)
            .then(res => res.json())
            .then(data => setCategories(data.data))
            .catch(err => console.error(err));
    }, []);
    const getCategoryName = (id) => {
        const category = categories.find(cat => cat.id === id);
        return category ? category.name : 'Unknown';
    };
    return (
        <div className="super-deals-container" style={{ backgroundColor: bgColor }}>
            <h2 className="super-deals-title">{title}</h2>
            <div className="product-grid">
                {Array.isArray(products) && products.slice(0, 6).map((item, index) => (
                    <ProductCard1
                        key={index}
                        id={item.id}
                        category={getCategoryName(item.category_id)}
                        title={item.description}
                        discount={item.sale}
                        originalPrice={item.price}
                        image={`${baseURL}${item.image}`}
                        bgColor={cardBgColor}
                        slug={item.slug}
                    />
                ))}
            </div>
        </div>
    );
};

export default SuperDeals;
