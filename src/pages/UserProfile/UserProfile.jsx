import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../stores/user';
import { orders } from '../../assets/assets';
import { IoIosArrowForward } from "react-icons/io";
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
        const user = orders[0];
        dispatch(setUserData({
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            lastOrders: user.orders,
        }));
    }, [dispatch]);

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="user-profile">
                <div className="profile-header">
                    <img
                        src={avatar || '/default-avatar.png'}
                        alt="User Avatar"
                        className="avatar"
                    />
                    <div className="user-info">
                        <h2>Usesr name: {username}</h2>
                        <p>Email: {email}</p>
                    </div>
                </div>

                <div className="order-history">
                    <h3>Last Orders</h3>
                    <ul className="orders-list">
                        {lastOrders.map(order => (
                            <li key={order.id} className="order-card">
                                <img src={order.image} alt={order.name} className="order-img" />
                                <div className="order-details">
                                    <h4>{order.name}</h4>
                                    <p><strong>Order ID:</strong> {order.orderId}</p>
                                    <p><strong>Date:</strong> {order.date}</p>
                                </div>
                            </li>
                        ))}
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
