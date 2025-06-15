import React, { useState, useEffect, useMemo } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavBar/BottomNavBar';
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import './Product.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../stores/cart';
import { addToFav } from '../../stores/favourite';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import Title from '../../components/Title/Title';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Cookies from 'js-cookie';

const baseURL = 'http://127.0.0.1:8000';

const Product = () => {
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const token = Cookies.get('token');

    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);

    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites);

    const [comment, setComment] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchProductById = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/view/products/${id}`);
                const data = response.data;

                setProductData(data);
                setMainImage(data.photos.length > 0 ? data.photos[0] : data.product.image || '');
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Product not found or server error");
            } finally {
                setLoading(false);
            }
        };

        const fetchSimilarProducts = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/products/${id}/similar`);
                const similarData = response.data.data;
                setSimilarProducts(Array.isArray(similarData) ? similarData : []);
            } catch (error) {
                console.error("Failed to fetch similar products", error);
                setSimilarProducts([]);
            }
        };

        if (id) {
            fetchProductById();
            fetchSimilarProducts();
        }
    }, [id]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    const imagesArray = useMemo(() => {
        return productData?.photos && productData.photos.length > 0
            ? productData.photos
            : [productData?.product?.image];
    }, [productData]);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % imagesArray.length);
        setMainImage(imagesArray[(currentIndex + 1) % imagesArray.length]);
    };

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        setCurrentIndex(newIndex);
        setMainImage(imagesArray[newIndex]);
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const handleAddToCart = async () => {
        if (!productData) return;

        if (!token) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            dispatch(addToCart({
                productId: productData.product.id,
                title: productData.product.name,
                image: productData.product.image,
                price: Math.round(productData.product.price - (productData.product.price * (productData.product.sale || 0) / 100)),
                quantity: quantity
            }));

            await axios.post(`${baseURL}/api/cart/`, {
                product_id: productData.product.id,
                quantity: quantity
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });

            toast.success(`${productData.product.name} added to cart!`);
        } catch (error) {
            console.error('Error details:', error.response?.data);
            toast.error(error.response?.data?.message || 'Failed to add item to cart');
        }
    };

    const handleAddToFav = async () => {
        if (!productData) return;

        if (!token) {
            toast.error('Please login to add items to Favourite');
            return;
        }

        try {
            dispatch(addToFav({
                productId: productData.product.id,
                title: productData.product.name,
                image: productData.product.image,
                price: Math.round(productData.product.price - (productData.product.price * (productData.product.sale || 0) / 100))
            }));

            await axios.post(`${baseURL}/api/favourites`, {
                product_id: productData.product.id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });

            toast.success(`${productData.product.name} added to favorites!`);
        } catch (error) {
            toast.error('Failed to add item to favorites');
            console.error(error);
        }
    };


    // review section 
    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!token) {
            toast.error('Please login to submit a review');
            return;
        }
        if (!comment.trim()) {
            toast.error('Comment cannot be empty');
            return;
        }
        try {
            setSubmitting(true);
            const response = await axios.post(`${baseURL}/api/user/add-review`, {
                product_id: productData.product.id,
                title: comment,
                rate: reviewRating // ✅ Changed from 'rating' to 'rate'
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Submitting review with:', {
                product_id: productData.product.id,
                comment,
                rate: reviewRating
            });
            toast.success('Review submitted successfully!');
            setComment('');
            setReviewRating(5);
            setProductData(prev => ({
                ...prev,
                reviews: [response.data.review, ...prev.reviews]
            }));
        } catch (error) {
            toast.error('Failed to submit review');
            console.error("Review submission error:", error.response?.data || error);
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar key={i} color={i <= rating ? '#FFA500' : '#ccc'} />
            );
        }
        return stars;
    };

    const evaluationData = useMemo(() => {
        return [5, 4, 3, 2, 1].map(starLevel => ({
            starLevel,
            percent: productData?.rating_percentages?.[starLevel] || 0
        }));
    }, [productData]);

    if (loading) return <div className="loading"><LoadingSpinner /></div>;
    if (error) return <div className="loading text-danger">{error}</div>;
    if (!productData) return <div className="loading">Product not found</div>;

    const product = productData.product;
    const ratingsCount = Object.values(productData.rating_percentages).reduce((a, b) => a + b, 0);
    const discountedPrice = Math.round(product.price - (product.price * (product.sale || 0) / 100));

    return (
        <div>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />

            <div className="product-container">
                <div className="product-gallery">
                    <div className="slider-controls">
                        <button className="slider-btn" onClick={handlePrev}>‹</button>
                        <img src={`${baseURL}${mainImage}`} alt="main" className="main-image" />
                        <button className="slider-btn" onClick={handleNext}>›</button>
                    </div>
                    <div className="thumbnail-row">
                        {imagesArray.map((img, idx) => (
                            <img
                                key={idx}
                                src={`${baseURL}${img}`}
                                alt={`thumb-${idx}`}
                                className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                                onClick={() => {
                                    setMainImage(img);
                                    setCurrentIndex(idx);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="product-details">
                    <h2>{product.name}</h2>
                    {product && (
                        <div className="rating">
                            {renderStars(Math.round(product.rating || 0))}
                            <span>{product.rating || 0} ({ratingsCount} ratings)</span>
                        </div>
                    )}
                    <button className="production-badge">Produced on demand</button>
                    <div className="price-section">
                        <h3 className="price">fairy {discountedPrice.toLocaleString()}.00</h3>
                        <div className="original-discount">
                            <span className="original-price">fairy {parseFloat(product.price).toLocaleString()}</span>
                            <span className="discount">discount {product.sale || 0}%</span>
                        </div>
                        <span className="saved">You saved {parseFloat(product.price - discountedPrice).toLocaleString()}.00</span>
                    </div>
                    <p className="delivery-note">{product.deliveryNote || 'Free delivery available'}</p>
                    <div className="description">
                        <h4>Description</h4>
                        <ul>
                            {Array.isArray(product.description) ? (
                                product.description.map((item, idx) => <li key={idx}>{item}</li>)
                            ) : (
                                <li>{product.description || 'No description available.'}</li>
                            )}
                        </ul>
                    </div>
                    <div className="action-buttons">
                        <div className="quantity-selector">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            Add To Cart <FaShoppingCart />
                        </button>
                        <button className="wishlist-button" onClick={handleAddToFav}>
                            <FaHeart className="heart-icon" />
                        </button>
                    </div>
                </div>
            </div>



            <div className='ED-evaluation'>
                <div className="evaluation-review-wrapper">
                    <div className="evaluation-summary">
                        <p className="summary-heading">{product.rating || 0} Based on ({ratingsCount}) evaluations</p>
                        {evaluationData.map((item, idx) => (
                            <div key={idx} className="star-rating-row">
                                <span className="star-label">{item.starLevel} Star{item.starLevel !== 1 ? 's' : ''}</span>
                                <div className="star-bar">
                                    <div className="star-bar-fill" style={{ width: `${item.percent}%` }}></div>
                                </div>
                                <span className="star-percent">{item.percent}%</span>
                            </div>
                        ))}
                    </div>
                    {console.log('productdata', productData)}
                    <div className="review-section">
                        <h3 className="review-title">Highest Rated Reviews</h3>
                        {productData.reviews.length > 0 ? (
                            productData.reviews.map((review, i) => (
                                <div key={i} className="review-item">
                                    <div className="review-avatar"><span>👤</span></div>
                                    <div className="review-content">
                                        <div className="review-header">
                                            <span className="review-name">{review.user || 'Anonymous'}</span>
                                            {/* <span className="review-date">{new Date(review.date).toLocaleDateString()}</span> */}
                                        </div>
                                        <span className="review-name">{review.title || 'Anonymous'}</span>
                                        <div className="review-stars">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    color={star <= review.rate ? '#FFA500' : '#ccc'}
                                                />
                                            ))}
                                        </div>
                                        <p className="review-text">{review.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}
                    </div>
                </div>
            </div>

            <Title title="Similar Products" />
            <div className="ED-product-2-slider-container">
                <button className="nav-button prev">&#10094;</button>
                <div className="ED-product-2-slider-wrapper">
                    <div className="ED-slider">
                        {Array.isArray(similarProducts) && similarProducts.length > 0 ? (
                            similarProducts.slice(0, 5).map((similar, i) => (
                                <ProductCard2
                                    key={i}
                                    id={similar.id}
                                    title={similar.name}
                                    slug={similar.id}
                                    image={`${baseURL}${similar.image}`}
                                    originalprice={similar.price}
                                    discount={similar.discount || 15}
                                />
                            ))
                        ) : (
                            <p>No similar products found.</p>
                        )}
                    </div>
                </div>
                <button className="nav-button next">&#10095;</button>
            </div>

            <div className="review-form-container">
                <h3 className="review-form-title">Leave a Review</h3>
                <form onSubmit={handleSubmitReview} className="review-form">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                    >
                        {[5, 4, 3, 2, 1].map((star) => (
                            <option key={star} value={star}>
                                {star} Star{star !== 1 ? 's' : ''}
                            </option>
                        ))}
                    </select>

                    <label htmlFor="comment">Comment:</label>
                    <textarea
                        id="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows="4"
                        placeholder="Write your review here..."
                    ></textarea>

                    <button type="submit" className="submit-review-btn" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default Product;
