import React from 'react'
import './VendorProfile.css'
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';
import Footer from '../../../components/Footer/Footer';
import { Link } from 'react-router-dom';
const VendorProfile = () => {
    return (
        <>
            <VendorNavbar />
            <div className="vendor-dashboard">
                <header className="dashboard-header">
                    <h1>Vendor Decor Plus</h1>
                </header>

                <div className="vendor-info">
                    <section className="info-section">
                        <h2>Full Name</h2>
                        <ul>
                            <li>Decor</li>
                            <li>Phone Number</li>
                            <li>015469887452</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>Address</h2>
                        <ul>
                            <li>Cairo Egypt</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>Full Name</h2>
                        <ul>
                            <li>Decor@organ.com</li>
                        </ul>
                    </section>

                    <section className="info-section">
                        <h2>ZipCode</h2>
                        <ul>
                            <li>45698214542</li>
                        </ul>
                    </section>
                </div>

                <div className="dashboard-divider"></div>

                <div className="package-section">
                    <div className="package-header">
                        <Link to='/vendorhome' className='vendor-console-package'>
                            <h2>MyPackage ▶</h2>
                        </Link>

                    </div>
                </div>

                <div className="dashboard-divider"></div>

                <div className="products-section">
                    <h2>Product Posted</h2>
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>Product ID</th>
                                <th>Status</th>
                                <th>Item Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>7bF987</td>
                                <td>Processing</td>
                                <td>1</td>
                                <td>17,800</td>
                            </tr>
                            <tr>
                                <td>A857523</td>
                                <td>Processing</td>
                                <td>1</td>
                                <td>5,800</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default VendorProfile;
