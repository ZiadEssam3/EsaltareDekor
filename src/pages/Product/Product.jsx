import React, { useState, useMemo, useEffect, useRef } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import { FaStar, FaHeart, FaUser } from "react-icons/fa";
import './Product.css';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../stores/cart';
import { addToFav } from '../../stores/favourite';
import { toast } from 'react-toastify';
import { fetchNewArrivalsData } from '../../services/NewArrivalsService';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import Title from '../../components/Title/Title';

const Product = () => {
    const { slug } = useParams();
    const [detail, setDetail] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const sliderRef = useRef(null);
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    const handleModeToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    }
    const [newArrivals, setNewArrivals] = useState([]);
    useEffect(() => {
        const loadNewArrivals = async () => {
            try {
                const data = await fetchNewArrivalsData();
                setNewArrivals(data);
            } catch (error) {
                console.error('Failed to load new arrivals', error);
            }
        };
        loadNewArrivals();
    }, []);

    // Combine and deduplicate products
    const allProducts = useMemo(() => {
        const uniqueProducts = [
            ...newArrivals.filter((product, index, self) =>
                index === self.findIndex((p) => p.slug === product.slug)
            ),
        ];
        return uniqueProducts;
    }, [newArrivals]);

    useEffect(() => {
        console.log("Slug from URL:", slug);

        // Fetch product details based on the slug
        const findDetail = allProducts.find(product => product.slug === slug);

        if (findDetail) {
            setDetail(findDetail);
            setMainImage(findDetail.images ? findDetail.images[0] : findDetail.image || '');
        } else {
            console.warn("Product not found for slug:", slug);
            setDetail(null); // Showing product not found message
        }
    }, [slug, allProducts]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${index * 220}px)`;
        }
    }, [index]);

    const handleNext2 = () => {
        setIndex((prev) => (prev + 1) % newArrivals.length);
    };

    const handlePrev2 = () => {
        setIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
    };

    const handleAddToCart = () => {
        if (!detail) return;
        try {
            dispatch(addToCart({
                productId: detail.id,
                quantity: quantity
            }));
            toast.success(`${detail?.title} added to cart!`);
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    const handleAddToFav = () => {
        if (!detail) return;
        try {
            dispatch(addToFav({
                productId: detail.id
            }));
            toast.success(`${detail?.title} added to favorites!`);
        } catch (error) {
            toast.error('Failed to add item to favorites');
        }
    };

    const imagesArray = detail?.images || [detail?.image];

    const handleNext = () => {
        const newIndex = (currentIndex + 1) % imagesArray.length;
        setCurrentIndex(newIndex);
        setMainImage(imagesArray[newIndex] || '');
    };

    const handlePrev = () => {
        const newIndex = (currentIndex - 1 + imagesArray.length) % imagesArray.length;
        setCurrentIndex(newIndex);
        setMainImage(imagesArray[newIndex] || '');
    };

    const increaseQuantity = () => setQuantity(prev => prev + 1);
    const decreaseQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

    const evaluationData = useMemo(() => {
        return [5, 4, 3, 2, 1].map(starLevel => ({
            starLevel,
            percent: (Math.random() * 0.7 + 0.3) * 100
        }));
    }, []);

    if (!detail) return <div className="loading">Product not found</div>;

    const rating = detail?.rating || 0;
    const ratingsCount = detail?.ratingsCount || 0;

    return (
        <div>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />

            <div className="product-container">
                <div className="product-gallery">
                    <div className="slider-controls">
                        <button className="slider-btn" onClick={handlePrev}>‹</button>
                        <img src={mainImage} alt="main" className="main-image" />
                        <button className="slider-btn" onClick={handleNext}>›</button>
                    </div>
                    <div className="thumbnail-row">
                        {imagesArray.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
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
                    <h2>{detail.title}</h2>
                    <div className="rating">
                        {[...Array(5)].map((_, i) => (
                            <FaStar key={i} color={i < Math.round(rating) ? '#FFA500' : '#ccc'} />
                        ))}
                        <span>{rating} ({ratingsCount} ratings)</span>
                    </div>

                    <button className="production-badge">Produced on demand</button>

                    <div className="price-section">
                        <h3 className="price">fairy {parseInt(detail.price).toLocaleString()}.00</h3>
                        <div className="original-discount">
                            <span className="original-price">fairy {parseInt(detail.originalPrice).toLocaleString()}.00</span>
                            <span className="discount">discount {detail.discount}%</span>
                        </div>
                        <span className="saved">You saved {parseInt(detail.saved).toLocaleString()}</span>
                    </div>

                    <p className="delivery-note">{detail.deliveryNote}</p>

                    <div className="description">
                        <h4>Description</h4>
                        <ul>
                            {detail.description?.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="action-buttons">
                        <div className="quantity-selector">
                            <button onClick={decreaseQuantity}>-</button>
                            <span>{quantity}</span>
                            <button onClick={increaseQuantity}>+</button>
                        </div>
                        <button className="add-to-cart" onClick={handleAddToCart}>Add To Cart</button>
                        <button className="wishlist-button" onClick={handleAddToFav}>
                            <FaHeart className="heart-icon" />
                        </button>
                    </div>
                </div>
            </div>

            <div className='ED-evaluation'>
                <div className="evaluation-review-wrapper">
                    <div className="evaluation-summary">
                        <p className="summary-heading">{rating} Based on ({ratingsCount}) evaluation</p>
                        {evaluationData.map((item, idx) => (
                            <div key={idx} className="bar-wrapper">
                                <span className="bar-label">{item.starLevel}</span>
                                <div className="bar-background">
                                    <div className="bar-fill" style={{ width: `${item.percent}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="review-section">
                        <h3 className="review-title">Highest Rated</h3>
                        {[1, 2].map((_, i) => (
                            <div key={i} className="review-item">
                                <div className="review-avatar"><FaUser /></div>
                                <div className="review-content">
                                    <div className="review-header">
                                        <span className="review-name">Ziad Essam</span>
                                        <span className="review-date">1/1/2025</span>
                                    </div>
                                    <div className="review-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} color={i < 5 ? '#FFA500' : '#ccc'} />
                                        ))}
                                    </div>
                                    <p className="review-text">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Title title="Similar Products" />
            <div className="ED-product-2-slider-container">
                <button className="nav-button prev" onClick={handlePrev2}>&#10094;</button>
                <div className="ED-product-2-slider-wrapper">
                    <div className="ED-slider" ref={sliderRef}>
                        {newArrivals.flatMap((product) => product.similarProducts).slice(0, 5).map((product, i) => (
                            <ProductCard2
                                key={i}
                                id={product.id}
                                title={product.title}
                                slug={product.slug}
                                image={product.image}
                                originalprice={product.price}
                                discount={15}
                                onClick={handleModeToTop}
                            />
                        ))}
                    </div>
                </div>
                <button className="nav-button next" onClick={handleNext2}>&#10095;</button>
            </div>


            <Footer />
        </div>
    );
};

export default Product;
