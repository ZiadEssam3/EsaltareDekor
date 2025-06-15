import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../../stores/user';
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';
import './UserProfile.css';
import Footer from '../../components/Footer/Footer';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavBar';
import { Link } from 'react-router-dom';
import { getUserProfileData, getUseroOrdersData } from '../../services/userService';
import Cookies from 'js-cookie';
import ErrorPage from '../Error/Error';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
const baseURL = 'http://127.0.0.1:8000';
const UserProfile = () => {
    const dispatch = useDispatch();
    const { username, email, avatar, lastOrders } = useSelector(state => state.user);
    const [loading, setLoading] = useState(true);
    const [orders, setOrders] = useState([]);
    const token = Cookies.get('token');
    if (!token) {
        return <ErrorPage />;
    }
    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) return;
            try {
                const data = await getUserProfileData(token);
                dispatch(setUserData({
                    username: data.name,
                    email: data.email,
                    avatar: data.avatar || null,
                    lastOrders: data.lastOrders || []
                }));
            } catch (error) {
                console.error("Failed to load user data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, [token, dispatch]);

    useEffect(() => {
        const fetchOrders = async () => {
            const data = await getUseroOrdersData(token);
            console.log('orders:', data);
            setOrders(data);
            setLoading(false);
        };

        fetchOrders();
    }, [token]);

    if (loading) {
        return <div><LoadingSpinner /></div>;
    }

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="user-profile">
                <div className="profile-header">
                    <div className="avatar-wrapper">
                        {avatar ? (
                            <img src={avatar} alt="User Avatar" className="avatar" />
                        ) : (
                            <FaUserCircle className="default-avatar-icon" />
                        )}
                    </div>
                    <div className="user-info">
                        <h2>User name: {username}</h2>
                        <p>Email: {email}</p>
                    </div>
                </div>

                <div className="order-history">
                    <h3>Last Orders</h3>
                    <ul className="orders-list">
                        {orders && orders.length > 0 ? (
                            orders.map(order => (
                                <li key={order.id} className="order-card">
                                    {order.products.length > 0 &&
                                        order.products.map(product => (
                                            <div key={product.id} className="product-item">
                                                <img
                                                    src={`${baseURL}${product.image}`}
                                                    alt={product.name}
                                                    className="order-img"
                                                />
                                                <div className="order-details">
                                                    <h4>{product.name}</h4>
                                                    <p><strong>Quantity:</strong> {product.pivot.quantity}</p>
                                                    <p><strong>Price:</strong> EGP {product.pivot.price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                    <div className="order-summary">
                                        <p><strong>Order ID:</strong> {order.order_num}</p>
                                        <p><strong>Status:</strong> {order.status}</p>
                                        <p><strong>Total Price:</strong> EGP {order.total_price}</p>
                                        <p><strong>Delivery Date:</strong> {order.delivery_date}</p>
                                        <Link to='/trackorder'>
                                            <div className="track-order">
                                                <span>Track Your Orders</span>
                                                <IoIosArrowForward />
                                            </div>
                                        </Link>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </ul>
                </div>


            </div>
            <Footer />
        </>
    );
};

export default UserProfile;