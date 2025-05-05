import React from 'react';
import './ProductCard2.css';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { FaCodeCompare } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../stores/cart';
import { addToFav } from '../../stores/favourite';
import { addToCompare } from '../../stores/product';
import { toast } from 'react-toastify';
import { color } from 'framer-motion';

const ProductCard2 = ({ id, image, title, originalprice, category, description, discount, slug, rating, onClick }) => {
    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites);
    const compareList = useSelector(store => store.products.compare);
    const dispatch = useDispatch();

    const isInCompare = compareList.some(product => product.id === id);
    const compareLimitReached = compareList.length >= 4;

    const handleAddToCart = () => {
        try {
            dispatch(addToCart({
                productId: id,
                quantity: 1
            }));
            toast.success(`${title} added to cart! 🛒`);
        } catch (error) {
            toast.error('Failed to add item to cart 😞');
        }
    };

    const handleAddToFav = () => {
        try {
            dispatch(addToFav({ productId: id }));
            toast.success(`${title} added to favorites! ❤️`);
        } catch (error) {
            toast.error('Failed to add item to favorites 😞');
        }
    };

    const handleAddToCompare = () => {
        console.log("Adding to compare", { id, image, title, originalprice, rating, slug });
        try {
            dispatch(addToCompare({
                id,
                image,
                title,
                originalprice,
                rating,
                slug,
                category,
                description
            }));
            toast.success(`${title} added to comparison! ⚖️`);
        } catch (error) {
            toast.error('Failed to add item to comparison 😞');
            console.error(error);  // Display the error in the console for debugging
        }
    };



    return (
        <div className="ED-product-2-card">
            <Link to={`/product/${slug}`}>
                <img src={image} alt={title} className="ED-product-2-image" onClick={onClick} />
            </Link>

            <div className="ED-product-2-info">
                <h3 className="ED-product-2-title">{title}</h3>
                <p className="ED-product-2-price">
                    <del style={{ color: "red" }}>fairy {originalprice}.00</del>
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
                disabled={isInCompare || compareLimitReached}
                title={isInCompare ? 'Already added' : compareLimitReached ? 'Limit reached' : 'Add to compare'}
            >
                <FaCodeCompare />
            </button>
        </div>
    );
};

export default ProductCard2;
