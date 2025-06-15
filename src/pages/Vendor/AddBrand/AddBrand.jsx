import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBrand.css";
import VendorNavbar from "../../../components/VendorNavbar/VendorNavbar";
import Footer from "../../../components/Footer/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getVendorData } from '../../../services/VendorSubService';

const AddBrand = () => {
    const token = Cookies.get('token');
    const navigate = useNavigate();
    const [authError, setAuthError] = useState(null);
    const [vendorData, setVendorData] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
        user_id: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData({ ...formData, image: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = new FormData();
        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("image", formData.image);
        payload.append("user_id", formData.user_id);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/brands", payload, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Brand submitted successfully!");
            console.log(response.data);
            setFormData({
                name: "",
                description: "",
                image: null,
                user_id: "",
            });
            document.getElementById("brand-image").value = null;

        } catch (error) {
            toast.error("Something went wrong!");
            console.error("Submission Error:", error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const vendorData = await getVendorData(token);

                if (vendorData.user?.role !== 'vendor') {
                    setTimeout(() => navigate('/access-denied'), 500);
                    return;
                }

                setVendorData(vendorData);
            } catch (err) {
                setAuthError('Unauthorized. Please login.');
                navigate('/login');
            }
        };

        if (token) {
            fetchData();
        } else {
            setAuthError('Unauthorized. Please login.');
            navigate('/login');
        }
    }, [token, navigate]);

    if (authError) {
        return (
            <>
                <VendorNavbar />
                <div className="vendor-dashboard">
                    <div className="error-message">
                        <h2>{authError}</h2>
                    </div>
                </div>
                <Footer />
            </>
        );
    }


    return (
        <>
            <VendorNavbar />
            <ToastContainer />
            <div className="brand-form-container">
                <h2>Add New Brand</h2>
                <form onSubmit={handleSubmit} className="brand-form">
                    <label>
                        Brand Name:
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter brand name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Description:
                        <textarea
                            name="description"
                            placeholder="Enter brand description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Brand Image:
                        <input
                            id="brand-image"
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        User ID:
                        <input
                            type="text"
                            name="user_id"
                            placeholder="Enter your user ID"
                            value={formData.user_id}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <button type="submit">Submit Brand</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AddBrand;
