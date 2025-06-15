import React, { useState, useEffect } from 'react';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from '../../utils/config';
import { setCartFromStorage } from '../../stores/cart';
import { getAllCartItems } from '../../services/NewArrivalsService';

const IMG_BASE = 'http://127.0.0.1:8000';

const Checkout = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();
    const token = getCookie('token');

    const [address, setAddress] = useState('');
    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);

    const total = cartItems.reduce((sum, item) => {
        const productPrice = parseFloat(item?.product?.price || 0);
        return sum + (item.quantity * productPrice);
    }, 0);

    const refreshCart = async () => {
        try {
            const updatedCart = await getAllCartItems(token);
            dispatch(setCartFromStorage(updatedCart));
        } catch (error) {
            console.error('Failed to refresh cart:', error);
        }
    };

    const handleQuantityChange = async (item, type) => {
        const id = item.id;
        const quantity = item.quantity;

        if (type === 0 || (type === 'decrement' && quantity === 1)) {
            try {
                await axios.delete(`${IMG_BASE}/api/cart/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Item removed from cart');
                await refreshCart();
            } catch (error) {
                console.error('Delete failed:', error);
                toast.error('Failed to remove item');
            }
            return;
        }

        let newQuantity = quantity;
        if (type === 'increment') newQuantity += 1;
        else if (type === 'decrement') newQuantity -= 1;

        try {
            await axios.put(
                `${IMG_BASE}/api/cart/${id}`,
                { quantity: String(newQuantity) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Quantity updated');
            await refreshCart();
        } catch (error) {
            console.error('Update failed:', error);
            toast.error('Failed to update quantity');
        }
    };

    const applyCoupon = async () => {
        try {
            const res = await axios.post(`${IMG_BASE}/api/checkout/apply-coupon`, {
                coupon_code: coupon,
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.data && res.data.discount) {
                setDiscount(res.data.discount);
                toast.success('Coupon applied successfully!');
            } else {
                toast.error('Invalid coupon');
            }
        } catch (err) {
            console.error(err);
            toast.error('Failed to apply coupon');
        }
    };

    const makePayment = async () => {
        if (!address) {
            toast.error('Please enter your address');
            return;
        }

        try {
            const response = await axios.post(`${IMG_BASE}/api/strip/checkout`, {
                address,
                coupon_code: coupon,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data && response.data.url) {
                window.location.href = response.data.url;
            } else {
                toast.error('Something went wrong with Stripe checkout.');
            }
        } catch (err) {
            console.error(err);
            toast.error('Checkout failed');
        }
    };

    return (
        <>
            <div className='Check-out-top'>Checkout</div>

            <div className="checkout-container">
                <div className="checkout-left">
                    <h2>Your Cart</h2>
                    {cartItems.map((item, index) => {
                        const product = item.product;
                        if (!product) return null;

                        return (
                            <div className="checkout-item" key={index}>
                                <img src={`${IMG_BASE}${product.image}`} alt={product.name} />
                                <div className="item-details">
                                    <h4>{product.name}</h4>
                                    <p>${parseFloat(product.price).toFixed(2)}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item, 'decrement')}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item, 'increment')}>+</button>
                                        <button className="delete-btn" onClick={() => handleQuantityChange(item, 0)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="checkout-right">
                    <input
                        type="text"
                        placeholder="Your Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <div className="coupon-box">
                        <input
                            type="text"
                            placeholder="Enter Coupon"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <button onClick={applyCoupon}>Apply</button>
                    </div>
                    <div className="summary">
                        <h4>Application Summary</h4>
                        <p><span>Total</span><span>${total.toFixed(2)}</span></p>
                        <p className="discount"><span>Discount</span><span>-${discount.toFixed(2)}</span></p>
                        <hr />
                        <p><strong>Grand Total</strong><strong>${(total - discount).toFixed(2)}</strong></p>
                    </div>
                    <button className="checkout-btn-ck" onClick={makePayment}>
                        Continue Your Purchase
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Checkout;
