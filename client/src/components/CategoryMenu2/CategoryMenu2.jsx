import React from 'react';
import './CategoryMenu2.css';

const baseURL = 'http://127.0.0.1:8000';

const CategoryMenu2 = ({ categories = [], onCategorySelect }) => {
    return (
        <div className="ED-category-menu">
            {categories.length > 0 ? (
                categories.map((category, index) => {
                    const imageUrl = category.image
                        ? category.image.startsWith('/storage')
                            ? `${baseURL}${category.image}`
                            : category.image
                        : '';

                    return (
                        <div
                            key={index}
                            className="ED-category-item"
                            onClick={() => onCategorySelect(category.name)}
                        >
                            <div className="ED-category-image">
                                <img
                                    src={imageUrl}
                                    alt={category.name}
                                />
                            </div>
                            <p className="ED-category-title">{category.name}</p>
                        </div>
                    );
                })
            ) : (
                <p className="ED-No-Product">No categories available</p>
            )}
        </div>
    );
};

export default CategoryMenu2;
