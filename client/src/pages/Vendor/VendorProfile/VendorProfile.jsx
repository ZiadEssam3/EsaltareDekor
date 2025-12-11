import React, { useEffect, useState } from 'react';
import './VendorProfile.css';
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';
import Footer from '../../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { getVendorData, getVendorOrders } from '../../../services/VendorSubService';
import Cookies from 'js-cookie';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import { toast } from 'react-toastify';

const VendorProfile = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const [vendorData, setVendorData] = useState(null);
    const [vendorOrders, setVendorOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendorData = await getVendorData(token);
                // Check if user is not a vendor
                if (vendorData.user?.role !== 'vendor') {
                    setTimeout(() => navigate('/access-denied'), 500);
                    return;
                }
                setVendorData(vendorData);
                const ordersData = await getVendorOrders(token);
                setVendorOrders(ordersData);
            } catch (err) {
                setError('Failed to load vendor data.');
            }
        };

        if (token) {
            fetchData();
        } else {
            setError('Unauthorized. Please login.');
            navigate('/login');
        }
    }, [token, navigate]);

    if (error) {
        return (
            <>
                <VendorNavbar />
                <div className="vendor-dashboard">
                    <div className="error-message">
                        <h2>{error}</h2>
                    </div>
                </div>
                <Footer />
            </>
        );
    }

    if (!vendorData) {
        return (
            <>
                <VendorNavbar />
                <div className="vendor-dashboard">
                    <LoadingSpinner />
                </div>
                <Footer />
            </>
        );
    }

    const { user, brand } = vendorData;

    return (
        <>
            <VendorNavbar />
            <div className="vendor-dashboard">
                <header className="dashboard-header">
                    <h1>Vendor : {brand?.name}</h1>
                </header>

                <div className="vendor-info">
                    <section className="info-section">
                        <h2>Full Name</h2>
                        <ul><li>{user?.name}</li></ul>
                    </section>

                    <section className="info-section">
                        <h2>Phone Number</h2>
                        <ul><li>{user?.phone}</li></ul>
                    </section>

                    <section className="info-section">
                        <h2>Address</h2>
                        <ul><li>{user?.address}</li></ul>
                    </section>

                    <section className="info-section">
                        <h2>Email</h2>
                        <ul><li>{user?.email}</li></ul>
                    </section>

                    <section className="info-section">
                        <h2>ZipCode</h2>
                        <ul><li>{user?.zip_code}</li></ul>
                    </section>

                    <section className="info-section">
                        <h2>Brand</h2>
                        <ul>
                            <li>{brand?.name}</li>
                            <li>{brand?.description}</li>
                        </ul>
                    </section>
                </div>

                <div className="dashboard-divider"></div>

                <div className="package-section">
                    <div className="package-header">
                        <Link to='/vendorhome' className='vendor-console-package'>
                            <h2>MyPackage</h2>
                        </Link>
                    </div>
                </div>

                <div className="dashboard-divider"></div>

                <div className="products-section">
                    <h2>Vendor Orders</h2>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Order Numebr</th>
                                <th>Customer</th>
                                <th>Status</th>
                                <th>Delivery Date</th>
                                <th>Total</th>
                                <th>Products</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendorOrders.length === 0 ? (
                                <tr>
                                    <td colSpan="6">No orders found.</td>
                                </tr>
                            ) : (
                                vendorOrders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.order_num}</td>
                                        <td>{order.user?.name || 'N/A'}</td>
                                        <td>{order.status}</td>
                                        <td>{order.delivery_date}</td>
                                        <td>{order.total_price} EGP</td>
                                        <td>
                                            {order.products.map(product => (
                                                <div key={product.id}>
                                                    {product.name} × {product.pivot.quantity}
                                                </div>
                                            ))}
                                        </td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default VendorProfile;
