import React, { useState } from 'react';
import './Search.css';
import Footer from '../../components/Footer/Footer';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import { NewArrivals } from '../../assets/assets';

const Search = () => {
    const [sortOption, setSortOption] = useState('Price: High to Low');
    const [selectedColors, setSelectedColors] = useState(['Black', 'Gold', 'Yellow', 'Pink']);
    const [selectedCategories, setSelectedCategories] = useState(['Corner sofa', 'best seller', 'Sofa bed']);
    const [priceRange, setPriceRange] = useState([0, 50000]);
    console.log(NewArrivals);
    
    const colors = [
        { name: 'Black', code: '#000000' },
        { name: 'Gold', code: '#FFD700' },
        { name: 'White', code: '#FFFFFF' },
        { name: 'Yellow', code: '#FFFF00' },
        { name: 'Pink', code: '#FFC0CB' }
    ];

    const categories = ['Corner sofa', 'best seller', 'Sofa bed'];

    const toggleColor = (color) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const toggleCategory = (category) => {
        setSelectedCategories(prev =>
            prev.includes(category)
                ? prev.filter(c => c !== category)
                : [...prev, category]
        );
    };

    const handlePriceChange = (e, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = parseInt(e.target.value);
        setPriceRange(newPriceRange);
    };

    const getDiscount = (original, current) => {
        const discount = ((original - current) / original) * 100;
        return Math.round(discount);
    };

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="search-page">
                <div className="filters-panel">
                    <div className="filter-section">
                        <div className="filter-header">Sort by</div>
                        <div className="sort-options">
                            <label className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    checked={sortOption === 'Price: Low to High'}
                                    onChange={() => setSortOption('Price: Low to High')}
                                />
                                Price: Low to High
                            </label>
                            <label className="checkbox-option">
                                <input 
                                    type="checkbox" 
                                    checked={sortOption === 'Price: High to Low'}
                                    onChange={() => setSortOption('Price: High to Low')}
                                />
                                Price: High to Low
                            </label>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Price</div>
                        <div className="price-range-container">
                            <div className="price-range-values">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                            <div className="price-range-slider">
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    value={priceRange[0]}
                                    onChange={(e) => handlePriceChange(e, 0)}
                                />
                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    value={priceRange[1]}
                                    onChange={(e) => handlePriceChange(e, 1)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Color</div>
                        <div className="color-options">
                            {colors.map(color => (
                                <label key={color.name} className="color-option">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedColors.includes(color.name)}
                                        onChange={() => toggleColor(color.name)}
                                        className="hidden-checkbox"
                                    />
                                    <span 
                                        className="color-indicator" 
                                        style={{ backgroundColor: color.code }}
                                    />
                                    {color.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Product Categories</div>
                        <div className="category-options">
                            {categories.map(category => (
                                <label key={category} className="checkbox-option">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                    />
                                    {category}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Buy by</div>
                        <div className="buy-by-options">
                            {/* Empty as in your image */}
                        </div>
                    </div>
                </div>

                <div className="products-grid">
                    {NewArrivals.map((product, i) => (
                        <ProductCard2
                            key={i}
                            id={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.originalPrice}
                            discount={getDiscount(product.originalPrice, product.price)}
                            slug={product.slug}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Search;