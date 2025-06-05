import React, { useState } from 'react';
import './VendorProduct.css';
import Footer from '../../../components/Footer/Footer';
import VendorNavbar from '../../../components/VendorNavbar/VendorNavbar';
import { useDispatch, useSelector } from 'react-redux';
import { setProductData, addNewProduct } from '../../../stores/VendorSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VendorProduct = () => {
    const dispatch = useDispatch();
    const { productData, loading, error } = useSelector((state) => state.productVendor || { productData: {}, loading: false, error: null });
    const [localImages, setLocalImages] = useState([]);

    const [previews, setPreviews] = useState([]);
    const [images, setImages] = useState([]);

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);

        const validFiles = files.filter(file => {
            if (file.size > 2 * 1024 * 1024) {
                alert("File size must be less than 2MB");
                return false;
            }
            if (!file.type.startsWith("image/")) {
                alert("Only image files are allowed");
                return false;
            }
            return true;
        });

        const newPreviews = validFiles.map(file => URL.createObjectURL(file));

        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        setImages((prevImages) => [...prevImages, ...validFiles]);
    };


    /*const handleChange = (e) => {
        const { name, value, files } = e.target;
    
        if (name === 'images') {
            const newImages = Array.from(files);
            const filteredNewImages = newImages.filter((newImage) =>
                !localImages.some((existingImage) => existingImage.name === newImage.name)
            );
    
            setLocalImages([...localImages, ...filteredNewImages]);
            dispatch(setProductData({
                ...productData,
                images: [...(productData.images || []), ...filteredNewImages]  
            }));
            toast.info(`${filteredNewImages.length} new image(s) selected`);
        } else {
            dispatch(setProductData({
                ...productData,
                [name]: name === 'price' ? parseFloat(value) : name === 'num_in_stock' ? parseInt(value) : value
            }));
        }
    };*/

    console.log(localImages);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("Final Product Data:", productData);
            await dispatch(addNewProduct(productData)).unwrap();
            toast.success("Product added successfully!");
            setLocalImages([]);
            dispatch(setProductData({
                name: '',
                category_id: '',
                subcategory_id: '',
                description: '',
                price: 0,
                num_in_stock: 0,
                images: [],
            }));
        } catch (err) {
            toast.error("Failed to add product.");
            console.error(err);
        }
    };

    return (
        <>
            <VendorNavbar />
            <ToastContainer />
            <div className="add-product-container">
                <h1 className="form-title">Add New Product</h1>

                <form onSubmit={handleSubmit} className="product-form">
                    <div className="upload-section">
                        <label htmlFor="product-images" className="upload-label">
                            Upload Images
                            <input
                                type="file"
                                id="product-images"
                                name="images"
                                accept="image/*"
                                multiple
                                onChange={handleChange}
                                className="file-input"
                            />
                        </label>

                        {localImages.length > 0 && (
                            <div className="preview-images">
                                {localImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={URL.createObjectURL(image)}
                                        alt={`Preview ${index + 1}`}
                                        className="preview-image"
                                    />
                                ))}
                            </div>
                        )}
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
                        <label htmlFor="product-category">Category</label>
                        <input
                            type="text"
                            id="product-category"
                            name="category_id"  
                            value={productData.category_id} 
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
                            placeholder="Add product description..."
                            rows="4"
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="product-price">Price</label>
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
                            <label htmlFor="product-subcategory">Subcategory</label>
                            <input
                                type="text"
                                id="product-subcategory"
                                name="subcategory_id"  
                                value={productData.subcategory_id} 
                                onChange={handleChange}
                                placeholder="Select subcategory"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="product-stock">Stock Quantity</label>
                        <input
                            type="number"
                            id="product-stock"
                            name="num_in_stock" 
                            value={productData.num_in_stock} 
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        {loading ? "Adding..." : "Add Product"}
                    </button>

                    {error && <p className="error-message">Error: {error}</p>}
                </form>
            </div>

            <Footer />
        </>
    );
};

export default VendorProduct;
