import React, { useState } from 'react';
import axios from 'axios';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import Footer from '../../components/Footer/Footer';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const token = Cookies.get('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://127.0.0.1:8000/api/contact';

        try {
            if (token) {
                // Logged-in user: only send message with Authorization header
                await axios.post(
                    url,
                    { message: formData.message },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                // Guest user: send name, email, and message
                await axios.post(url, {
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                });
            }

            toast.success(`Message sent successfully!`);
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error(error);
            toast.error(`Failed to send message`);
        }
    };

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="container py-5">
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            {!token && (
                                <>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Full Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </>
                            )}
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn" style={{ backgroundColor: '#7b0606', color: 'white' }}>
                                Send Message
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h2>Our Location</h2>
                        <p>
                            Furniture Store, Main Street, City, Country.
                        </p>
                        <div className="map-container">
                            <iframe
                                title="Store Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2925.4636506048067!2d-73.97242138422365!3d40.678178400000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a2d28ccf627%3A0x2df24bada21e6e70!2sBrooklyn%20Bridge!5e0!3m2!1sen!2sus!4v1615619998832!5m2!1sen!2sus"
                                width="100%"
                                height="300"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ContactUs;
