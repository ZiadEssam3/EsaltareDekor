import React from 'react';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity } from '../../stores/cart';
import { FaTrash } from 'react-icons/fa';
import { NewArrivals } from '../../assets/assets';
import Footer from '../../components/Footer/Footer';
import { loadStripe } from '@stripe/stripe-js';
const Checkout = () => {
    const cartItems = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const total = cartItems.reduce((sum, item) => {
        const product = NewArrivals.find(p => p.id === item.productId);
        const productPrice = product ? product.price : 0;
        return sum + item.quantity * productPrice;
    }, 0);

    const handleQuantityChange = (productId, type) => {
        const item = cartItems.find(item => item.productId === productId);
        if (!item) return;

        const newQuantity =
            type === 'increment' ? item.quantity + 1 :
                type === 'decrement' ? item.quantity - 1 : 0;

        dispatch(changeQuantity({ productId, quantity: newQuantity }));
    };
    console.log(cartItems);
    const makePayment = async () => {
        const stripe = await loadStripe("pk_test_51QSjjVBbQbdCEIO0UiBSNLaIsI1pCh5j086JByiPwd5LWuZIrot56GLoUprFEyEdh84vXiuD3fu75VTLVf8tP41B00t3QpyzuL")
        const products = cartItems.map(item => {
            const product = NewArrivals.find(p => p.id === item.productId);
            return {
                name: product?.title || "Unknown",
                image: product?.image || "",
                price: product?.price || 0,
                quantity: item.quantity,
            };
        });
    
        const response = await fetch("http://localhost:3000/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ products }),
        });
    
        const session = await response.json();
    
        if (!stripe || !session.id) {
            console.error("Stripe or session is missing:", session);
            return;
        }
    
        const result = await stripe.redirectToCheckout({
            sessionId: session.id,
        });
    
        if (result.error) {
            console.log(result.error.message);
        }
    }
    return (
        <>
            <div className='Check-out-top'>
                Checkout
            </div>

            <div className="checkout-container">
                <div className="checkout-left">
                    <h2>Your Cart</h2>
                    {cartItems.map((item, index) => {
                        const product = NewArrivals.find(p => p.id === item.productId);
                        if (!product) return null;

                        return (
                            <div className="checkout-item" key={index}>
                                <img src={product.image} alt={product.title} />
                                <div className="item-details">
                                    <h4>{product.title}</h4>
                                    <p>{product.price.toLocaleString()}</p>
                                    <div className="quantity-controls">
                                        <button onClick={() => handleQuantityChange(item.productId, 'decrement')}>-</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleQuantityChange(item.productId, 'increment')}>+</button>
                                        <button className="delete-btn" onClick={() => handleQuantityChange(item.productId, 0)}>
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="checkout-right">
                    <input type="text" placeholder="Your Address" />
                    <div className="coupon-box">
                        <input type="text" placeholder="Enter Coupon" />
                        <button>Apply</button>
                    </div>
                    <div className="summary">
                        <h4>Application Summary</h4>
                        <p><span>Total</span><span>fairy {total.toLocaleString()}.00</span></p>
                        <p className="discount"><span>Discount</span><span>- fairy 50.00</span></p>
                        <hr />
                        <p><strong>Grand Total</strong><strong>fairy {(total - 50).toLocaleString()}.00</strong></p>
                    </div>
                    <button
                        className="checkout-btn-ck"
                        onClick={makePayment}
                    >
                        Continue Your Purchase
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Checkout;
