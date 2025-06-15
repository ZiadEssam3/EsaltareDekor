import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './Search.css';
import Footer from '../../components/Footer/Footer';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
const baseURL = 'http://127.0.0.1:8000/';

const Search = () => {
    const [products, setProducts] = useState([]);
    const [sortOption, setSortOption] = useState('Price: Low to High');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);  
    const [priceRange, setPriceRange] = useState([0, 50000]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`${baseURL}api/esaltare/products/filter`)
            .then(response => {
                console.log('pricture 1', response.data[0].image);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        axios.get(`${baseURL}api/esaltare/categories`)
            .then(res => {
                console.log('Categories response:', res.data.data);
                setCategories(res.data.data);
            })
            .catch(err => console.error('Error fetching categories:', err));
    }, []);

    const filteredProducts = useMemo(() => {
        return products
            .filter(product => {
                if (selectedColors.length > 0) {
                    if (product.color) {
                        if (Array.isArray(product.color)) {
                            if (!product.color.some(c => selectedColors.includes(c))) return false;
                        } else {
                            if (!selectedColors.includes(product.color)) return false;
                        }
                    } else {
                        return false;
                    }
                }
                if (selectedCategories.length > 0 && !selectedCategories.includes(product.category_id)) {
                    return false;
                }
                const price = parseFloat(product.price);
                if (price < priceRange[0] || price > priceRange[1]) return false;

                return true;
            })
            .sort((a, b) => {
                if (sortOption === 'Price: Low to High') {
                    return parseFloat(a.price) - parseFloat(b.price);
                } else if (sortOption === 'Price: High to Low') {
                    return parseFloat(b.price) - parseFloat(a.price);
                }
                return 0;
            });
    }, [products, selectedColors, selectedCategories, priceRange, sortOption]);

    const colors = [
        { name: 'Black', code: '#000000' },
        { name: 'Gold', code: '#FFD700' },
        { name: 'White', code: '#FFFFFF' },
        { name: 'Yellow', code: '#FFFF00' },
        { name: 'Pink', code: '#FFC0CB' }
    ];

    const toggleColor = (color) => {
        setSelectedColors(prev =>
            prev.includes(color)
                ? prev.filter(c => c !== color)
                : [...prev, color]
        );
    };

    const toggleCategory = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(c => c !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handlePriceChange = (e, index) => {
        const newPriceRange = [...priceRange];
        newPriceRange[index] = parseInt(e.target.value);
        setPriceRange(newPriceRange);
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
                            {Array.isArray(categories) && categories.map(category => (
                                <label key={category.id} className="checkbox-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => toggleCategory(category.id)}
                                    />
                                    {category.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="filter-section">
                        <div className="filter-header">Buy by</div>
                        <div className="buy-by-options">
                        </div>
                    </div>
                </div>

                <div className="products-grid">
                    {filteredProducts.length === 0 ? (
                        <div className="no-products-message">No Products match</div>
                    ) : (
                        filteredProducts.map((product) => (
                            <ProductCard2
                                key={product.id}
                                id={product.id}
                                image={`${baseURL}storage/${product.image}`}
                                title={product.description}
                                originalprice={product.price}
                                discount={product.sale}
                                category={product.category_id}
                                slug={product.id}
                                description={product.description}
                            />
                        ))
                    )}
                </div>

            </div>
            <Footer />
        </>
    );
};

export default Search;
