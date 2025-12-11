import React from 'react';
import './ProductCard2.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../stores/cart';
import { addToFav } from '../../stores/favourite';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProductCard2 = ({
    id, image, title, originalprice, category,
    description, discount, slug, rating, onClick
}) => {

    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites);
    const dispatch = useDispatch();

    const cartURL = 'http://127.0.0.1:8000/api/cart/';
    const favURL = 'http://127.0.0.1:8000/api/favourites';
    const compareURL = 'http://127.0.0.1:8000/api/compare';

    const token = Cookies.get('token');

    const handleAddToCart = async () => {
        if (!token) {
            toast.error('Please login to add items to cart');
            return;
        }

        try {
            dispatch(addToCart({
                productId: id,
                title,
                image,
                price: Math.round(originalprice - (originalprice * discount / 100)),
                quantity: 1
            }));

            await axios.post(cartURL, {
                product_id: id,
                quantity: 1
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });

            toast.success(`${title} added to cart!`);
        } catch (error) {
            console.error('Error details:', error.response?.data);
            toast.error(error.response?.data?.message || 'Failed to add item to cart');
        }
    };

    const handleAddToFav = async () => {
        if (!token) {
            toast.error('Please login to add items to Favourite');
            return;
        }
        try {
            dispatch(addToFav({ productId: id }));
            await axios.post(favURL, {
                product_id: id
            },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                    withCredentials: true
                });
            toast.success(`${title} added to favorites!`);
        } catch (error) {
            toast.error('Failed to add item to favorites');
            console.error(error);
        }
    };

    const handleAddToCompare = async () => {
        if (!token) {
            toast.error('Please login to add items to comparison');
            return;
        }

        try {
            const res = await axios.get(compareURL, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const compareList = res.data.data || [];

            if (compareList.some(item => item.product.id === id)) {
                toast.info(`${title} is already in comparison list`);
                return;
            }

            if (compareList.length >= 4) {
                toast.error('Comparison list limit reached (4 items max)');
                return;
            }

            await axios.post(compareURL, {
                product_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                withCredentials: true
            });

            toast.success(`${title} added to comparison!`);
        } catch (error) {
            console.error('Error adding to compare:', error.response?.data);
            toast.error(error.response?.data?.message || 'Failed to add item to comparison');
        }
    };

    return (
        <div className="ED-product-2-card">
            <Link to={`/product/${id}`}>
                <img
                    src={image}
                    alt={title}
                    className="ED-product-2-image"
                    onClick={onClick}
                />
            </Link>

            <div className="ED-product-2-info">
                <h3 className="ED-product-2-title">{title}</h3>
                <p className="ED-product-2-price">
                    <del style={{ color: "red" }}>fairy {originalprice}</del>
                </p>
                <h5>{Math.round(originalprice - (originalprice * discount / 100))}.00</h5>
                <span className="ED-product-2-discount">discount {discount}%</span>
            </div>

            <button className='ED-add-cart' onClick={handleAddToCart}>
                Add to cart <FaShoppingCart />
            </button>

            <button className='ED-add-face' onClick={handleAddToFav}>
                <FaHeart />
            </button>

            <button
                className='ED-add-compare'
                onClick={handleAddToCompare}
                title="Add to compare"
            >
                <FaCodeCompare />
            </button>
        </div>
    );
};

export default ProductCard2;
