import React, { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import './Tracking.css';
import Footer from '../../components/Footer/Footer';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
const OrderTracking = () => {
    const [activeStep, setActiveStep] = useState(1);

    const trackingStages = [
        'Placed',
        'Packing',
        'Dispatched',
        'In Transit',
        'Delivered',
    ];

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className='ED-Track-order-top'>
                Order Tracking
            </div>
            <div className="order-tracking-container">
                <h3>Shipment Tracking</h3>
                <div className="tracking-details">
                    <p>Tracking ID: <strong>65498</strong></p>
                    <p>Expected Delivery: <strong>Monday, 6 February 2025 by 8:00 PM</strong></p>
                    <p>Delivery Location: <strong>CairoEgypt</strong></p>
                </div>

                <Stepper
                    activeStep={activeStep}
                    styleConfig={{
                        activeBgColor: '#0073e6',
                        completedBgColor: '#4caf50',
                        inactiveBgColor: '#e0e0e0',
                        activeTextColor: '#ffffff',
                        completedTextColor: '#ffffff',
                        inactiveTextColor: '#757575',
                    }}
                >
                    {trackingStages.map((stage, index) => (
                        <Step key={index} label={stage} />
                    ))}
                </Stepper>


                <div className="status-details mt-4">
                    {activeStep === 0 && <p>Your order has been placed.</p>}
                    {activeStep === 1 && <p>Your order is currently being packed.</p>}
                    {activeStep === 2 && <p>Your order has been dispatched.</p>}
                    {activeStep === 3 && <p>Your order is in transit.</p>}
                    {activeStep === 4 && <p>Your order has been delivered!</p>}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default OrderTracking;