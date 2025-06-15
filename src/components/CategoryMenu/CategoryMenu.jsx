import React from 'react';
import './CategoryMenu.css';
import { categories } from '../../assets/assets';
import { Link } from 'react-router-dom';

const CategoryMenu = ({ onCategorySelect }) => {
    return (
        <div className="ED-category-menu">
            {categories.map((category, index) => (
                <div
                    key={index}
                    className="ED-category-item"
                    onClick={() => onCategorySelect(category.title)} 
                >
                    <div className="ED-category-image">
                        <Link to={`/categories`}>
                            <img src={category.image} alt={category.title} />
                        </Link>
                    </div>
                    <p className="ED-category-title">{category.title}</p>
                </div>
            ))}
        </div>
    );
};

export default CategoryMenu;
