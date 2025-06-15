import React, { useEffect, useState } from 'react';
import './Compare.css';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import { FaStar } from 'react-icons/fa';
import axios from 'axios';
import { getCookie } from '../../utils/config';
import { toast } from 'react-toastify';

const baseURL = 'http://127.0.0.1:8000';

const ComparePage = () => {
    const [compareData, setCompareData] = useState([]);

    const token = getCookie('token');

    useEffect(() => {
        const fetchCompareData = async () => {
            try {
                const res = await axios.get(`${baseURL}/api/compare`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCompareData(res.data.data);
            } catch (err) {
                console.error('Error fetching compare data:', err);
                toast.error('Failed to load comparison data');
            }
        };

        fetchCompareData();
    }, [token]);

    const handleClearCompare = async () => {
        try {
            await axios.delete(`${baseURL}/api/compare`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCompareData([]);
            toast.success('Comparison cleared');
        } catch (err) {
            console.error('Error clearing compare:', err);
            toast.error('Failed to clear comparison');
        }
    };

    const handleRemoveItem = async (id) => {
        try {
            await axios.delete(`${baseURL}/api/compare/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCompareData(prev => prev.filter(item => item.id !== id));
            toast.success('Item removed');
        } catch (err) {
            console.error('Error removing item:', err);
            toast.error('Failed to remove item');
        }
    };

    if (compareData.length === 0) {
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
        { key: 'name', label: 'Product Name' },
        { key: 'price', label: 'Price' },
        { key: 'description', label: 'Description' },
        { key: 'width', label: 'Width' },
        { key: 'height', label: 'Height' },
        { key: 'length', label: 'Length' },
        { key: 'num_in_stock', label: 'Stock' },
        { key: 'sale', label: 'Discount (%)' },
    ];

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="compare-wrapper">
                <div className="compare-header">
                    <h2>Compare Products</h2>
                    <button className="btn-clear" onClick={handleClearCompare}>Clear All</button>
                </div>

                <div className="compare-table">
                    {attributes.map(attr => (
                        <div className="compare-row" key={attr.key}>
                            <div className="compare-attribute">{attr.label}</div>
                            {compareData.map(item => (
                                <div className="compare-value" key={item.id}>
                                    {attr.key === 'image' ? (
                                        <img
                                            src={`${baseURL}${item.product.image}`}
                                            alt={item.product.name}
                                            className="compare-img"
                                        />
                                    ) : (
                                        item.product[attr.key] ?? 'N/A'
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}

                    <div className="compare-row">
                        <div className="compare-attribute">Action</div>
                        {compareData.map(item => (
                            <div className="compare-value" key={item.id}>
                                <button className="btn-remove" onClick={() => handleRemoveItem(item.id)}>Remove</button>
                                <a href={`/product/${item.product.id}`} className="btn-view">View</a>
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
