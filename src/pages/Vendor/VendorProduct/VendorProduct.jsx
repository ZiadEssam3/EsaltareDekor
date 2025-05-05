import React, { useState } from 'react';
import './VendorProduct.css';
import Footer from '../../../components/Footer/Footer';
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';

const VendorProduct = () => {
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        description: '',
        price: '',
        subcategory: '',
        image: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setProductData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Product Data:', productData);
    };

    return (
        <>
            <VendorNavbar />
            <div className="add-product-container">
                <h1 className="form-title">Adding New Product</h1>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="upload-section">
                        <label htmlFor="product-image" className="upload-label">
                            Upload Image
                            <input
                                type="file"
                                id="product-image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="file-input"
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-name">Product Name</label>
                        <input
                            type="text"
                            id="product-name"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            placeholder="Enter product name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-category">Product Category</label>
                        <input
                            type="text"
                            id="product-category"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            placeholder="Select category"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-description">Product Description</label>
                        <textarea
                            id="product-description"
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            placeholder="Add Description...."
                            rows="4"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="product-price">Product price</label>
                            <input
                                type="number"
                                id="product-price"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="product-subcategory">Product Subcategory</label>
                            <input
                                type="text"
                                id="product-subcategory"
                                name="subcategory"
                                value={productData.subcategory}
                                onChange={handleChange}
                                placeholder="Select subcategory"
                            />
                        </div>
                    </div>

                    <button type="submit" className="submit-button">
                        Add Product
                    </button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default VendorProduct;