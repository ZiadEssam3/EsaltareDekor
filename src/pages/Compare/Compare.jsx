import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCompare, removeFromCompare } from '../../stores/product';
import './Compare.css';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import { FaStar } from 'react-icons/fa';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import { getCookie } from '../../utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ComparePage = () => {
    const compared = useSelector((state) => state.products.compare);
    const dispatch = useDispatch();
    const token = getCookie('authToken');

    useEffect(() => {
        const storedCompare = localStorage.getItem('compare');
        if (storedCompare) {
            dispatch({ type: 'products/setProducts', payload: { compare: JSON.parse(storedCompare) } });
        }
    }, [dispatch]);

    const handleRemoveFromCompare = async (pId) => {
        dispatch(removeFromCompare(pId));
        try {
            await axios.delete(`http://web-production-0ba5.up.railway.app/api/compare/${pId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Failed to delete item from cart:', error);
            toast.error('Error removing item');
        }
        // Update localStorage
        const updatedCompare = compared.filter((product) => product.id !== pId);
        localStorage.setItem('compare', JSON.stringify(updatedCompare));
    };

    const handleClearCompare = async () => {
        dispatch(clearCompare());
        localStorage.removeItem('compare');
        try {
            await axios.delete(`http://web-production-0ba5.up.railway.app/api/compare`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success('Item removed from cart');
        } catch (error) {
            console.error('Failed to delete item from cart:', error);
            toast.error('Error removing item');
        }
    }


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
        { key: 'originalPrice', label: 'Price' },
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
                    <button className="btn-clear" onClick={handleClearCompare}>
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
                                        <img src={product.image} alt={product.title} className="compare-img" />
                                    ) : attr.key === 'originalPrice' ? (
                                        `$${product.originalPrice}`
                                    ) : attr.key === 'rating' ? (
                                        <>
                                            <span>{product.rating ?? 'N/A'} </span>
                                            {[...Array(Math.floor(product.rating || 0))].map((_, index) => (
                                                <FaStar key={index} style={{ color: 'gold', marginRight: '5px' }} />
                                            ))}
                                        </>
                                    ) : (
                                        product[attr.key] ?? 'N/A'
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="compare-row">
                        <div className="compare-attribute">Action</div>
                        {compared.map((product) => (
                            <div className="compare-value" key={product.id}>
                                <button className="btn-remove" onClick={() => handleRemoveFromCompare(product.id)}>
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

