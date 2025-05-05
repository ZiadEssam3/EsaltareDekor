import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCompare, removeFromCompare } from '../../stores/product'; // Import your actions
import './Compare.css';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaStar } from 'react-icons/fa';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';

const ComparePage = () => {
    const compared = useSelector((state) => state.products.compare); // Get compare items from the Redux state
    const dispatch = useDispatch();

    // Load compare products from localStorage when component mounts
    useEffect(() => {
        const storedCompare = localStorage.getItem('compare');
        if (storedCompare) {
            // Update Redux state with the data from localStorage
            dispatch({ type: 'products/setProducts', payload: { compare: JSON.parse(storedCompare) } });
        }
    }, [dispatch]);

    if (compared.length === 0) {
        return (
            <>
                <TopNavbar />
                <Navbar />
                <BottomNavBar />
                <div className="compare-empty">No products selected for comparison.</div>
                <Footer />
            </>
        );
    }

    const attributes = [
        { key: 'image', label: 'Image' },
        { key: 'title', label: 'Product Name' },
        { key: 'price', label: 'Price' },
        { key: 'rating', label: 'Rating' },
        { key: 'category', label: 'Category' },
        { key: 'description', label: 'Description' },
    ];

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="compare-wrapper">
                <div className="compare-header">
                    <h2>Compare Products</h2>
                    {/* Button to clear the compare list */}
                    <button className="btn-clear" onClick={() => dispatch(clearCompare())}>
                        Clear All
                    </button>
                </div>

                <div className="compare-table">
                    {attributes.map((attr) => (
                        <div className="compare-row" key={attr.key}>
                            <div className="compare-attribute">{attr.label}</div>
                            {compared.map((product) => (
                                <div className="compare-value" key={product.id}>
                                    {attr.key === 'image' ? (
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="compare-img"
                                        />
                                    ) : attr.key === 'price' ? (
                                        `$${product.price}`
                                    ) : attr.key === 'rating' ? (
                                        <>
                                            <span>{product.rating} </span>
                                            {[...Array(Math.floor(product.rating))].map((_, index) => (
                                                <FaStar key={index} style={{ color: 'gold', marginRight: '5px' }} />
                                            ))}
                                        </>
                                    ) : (
                                        product[attr.key]
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    {/* Actions column */}
                    <div className="compare-row">
                        <div className="compare-attribute">Action</div>
                        {compared.map((product) => (
                            <div className="compare-value" key={product.id}>
                                <button
                                    className="btn-remove"
                                    onClick={() => dispatch(removeFromCompare(product.id))}
                                >
                                    Remove
                                </button>
                                <a href={`/product/${product.slug}`} className="btn-view">
                                    View
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ComparePage;
