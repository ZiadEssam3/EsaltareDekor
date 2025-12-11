import React, { useEffect, useState } from 'react';
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';
import Footer from '../../../components/Footer/Footer';
import PackageCard from '../../../components/VendorPackage/VendorPackage';
import './VendorHome.css';
import { assets } from '../../../assets/assets';
import { getPackages } from '../../../services/VendorSubService';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import axios from 'axios';
import { getCookie } from '../../../utils/config';
import { toast } from 'react-toastify';

const VendorHome = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPackages = async () => {
            try {
                const data = await getPackages();
                setPackages(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchPackages();
    }, []);

    const handleSubscribe = async (packageId) => {
        try {
            const token = getCookie('token');
            if (!token) {
                alert('You must be logged in as a vendor to subscribe.');
                return;
            }

            const response = await axios.post(
                'http://127.0.0.1:8000/api/package/subscribe',
                { package_id: packageId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Debug log to inspect full backend response
            console.log('Subscribe response:', response.data);

            // Try to use stripe_url or fallback to url or session_url
            const stripeUrl =
                response.data.stripe_url || response.data.url || response.data.session_url;

            if (stripeUrl) {
                window.location.href = stripeUrl;
            } else {
                toast.message('Subscription successful, but no Stripe URL received.');
            }
        } catch (error) {
            console.error('Subscription error:', error);
            toast.error('Subscription failed. Please try again.');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div>
            <VendorNavbar />
            <div className='ED-Vendor-console-logo'>
                <img src={assets.ED_logo} alt="ED Logo" />
            </div>
            <h1 className='ED-Vendor-console-title'>
                Welcome to Esaltare Deckör Console Packages
                <br />
                Please Select A Package To Subscribe
            </h1>
            <div className='Vendor-package-display'>
                {packages.map((pkg) => {
                    let features = [];
                    if (typeof pkg.items === 'string') {
                        features = pkg.items.split(',');
                    } else if (Array.isArray(pkg.items)) {
                        features = pkg.items;
                    }

                    return (
                        <PackageCard
                            key={pkg.id}
                            title={pkg.name.toLowerCase() + " package"}
                            tier={pkg.name.toUpperCase()}
                            price={`$${pkg.price}`}
                            features={features}
                            buttonColor={getButtonColor(pkg.name)}
                            onSubscribe={() => handleSubscribe(pkg.id)}
                        />
                    );
                })}
            </div>
            <Footer />
        </div>
    );
};

const getButtonColor = (packageName) => {
    switch (packageName.toLowerCase()) {
        case 'beginner':
            return '#ff5b89';
        case 'standard':
            return '#1ca9c9';
        case 'premium':
            return '#6e5da6';
        default:
            return '#6e5da6';
    }
};

export default VendorHome;
