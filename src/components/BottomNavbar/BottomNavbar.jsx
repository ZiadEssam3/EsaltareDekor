import React, { useState } from 'react';
import './BottomNavBar.css';

const categories = [
    {
        name: 'Furniture',
        subcategories: ['Beds', 'Sofas', 'Chairs', 'Tables', 'Cabinets'],
    },
    {
        name: 'Storage Units',
        subcategories: ['Wardrobes', 'Shelves', 'Drawers', 'Shoe Racks'],
    },
    {
        name: 'Home Decor',
        subcategories: ['Wall Art', 'Vases', 'Lamps', 'Rugs'],
    },
    {
        name: 'Office Furniture',
        subcategories: ['Office Chairs', 'Desks', 'Bookcases', 'Filing Cabinets'],
    },
    {
        name: 'Lighting',
        subcategories: ['Ceiling Lights', 'Table Lamps', 'Wall Lights'],
    },
    {
        name: 'Fabrics & Upholstery',
        subcategories: ['Curtains', 'Cushions', 'Sofa Covers'],
    },
    {
        name: 'Kitchen & Bathroom',
        subcategories: ['Kitchen Cabinets', 'Sinks', 'Bathroom Accessories'],
    },
    {
        name: 'Home Appliances',
        subcategories: ['Refrigerators', 'Washing Machines', 'Microwaves'],
    },
];

const BottomNavBar = () => {
    const [activeCategory, setActiveCategory] = useState(null);
    return (
        <div className='ED-bottom-nav'>
            <ul className='ED-bottom-nav-list'>
                {categories.map((category, index) => (
                    <li
                        key={index}
                        className='ED-bottom-nav-item'
                        onMouseEnter={() => setActiveCategory(category.name)}
                        onMouseLeave={() => setActiveCategory(null)}
                    >
                        <a href='#'>{category.name}</a>
                        {activeCategory === category.name && (
                            <ul className='ED-dropdown-menu'>
                                {category.subcategories.map((sub, idx) => (
                                    <li key={idx} className='ED-dropdown-item'>
                                        <a href='#'>{sub}</a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BottomNavBar;