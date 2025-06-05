import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setUserData } from '../../stores/user';
import { IoIosArrowForward } from "react-icons/io";
import { FaUserCircle } from 'react-icons/fa';  // استيراد أيقونة الافاتار
import './UserProfile.css';
import Footer from '../../components/Footer/Footer';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { username, email, avatar, lastOrders } = useSelector(state => state.user);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await axios.get('http://web-production-0ba5.up.railway.app/api/user/orders');
                const data = response.data;
                dispatch(setUserData({
                    username: data.username,
                    email: data.email,
                    avatar: data.avatar,
                    lastOrders: data.orders,
                }));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }
        fetchOrders();
    }, [dispatch]);

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="user-profile">
                <div className="profile-header">
                    <div className="avatar-wrapper">
                        {avatar ? (
                            <img
                                src={avatar}
                                alt="User Avatar"
                                className="avatar"
                            />
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
                        {lastOrders && lastOrders.length > 0 ? (
                            lastOrders.map(order => (
                                <li key={order.id} className="order-card">
                                    <img src={order.image} alt={order.name} className="order-img" />
                                    <div className="order-details">
                                        <h4>{order.name}</h4>
                                        <p><strong>Order ID:</strong> {order.orderId}</p>
                                        <p><strong>Date:</strong> {order.date}</p>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p>No orders found.</p>
                        )}
                    </ul>
                </div>
            </div>
            <Link to='/trackorder'>
                <div className="track-order">
                    <span>Track Your Order</span>
                    <IoIosArrowForward />
                </div>
            </Link>
            <Footer />
        </>
    );
};

export default UserProfile;
