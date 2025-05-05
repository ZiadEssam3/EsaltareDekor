import React from 'react';
import './Checkout.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity } from '../../stores/cart';
import { FaTrash } from 'react-icons/fa';
import { NewArrivals } from '../../assets/assets';
import Footer from '../../components/Footer/Footer';

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
                    <button className="checkout-btn-ck">Continue Your Purchase</button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Checkout;
