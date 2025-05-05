import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { toggleStatusTab } from '../../stores/cart';
import './CartTab.css';
import { useNavigate } from 'react-router-dom';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const handleCheckout = () => {
        navigate('/checkout');
        console.log("checkout");
    };
    return (
        <div className={`cart-tab ${statusTab ? 'open' : ''}`}>
            <h2 className="cart-header">Shopping Cart</h2>
            <div className="cart-body">
                {carts.length === 0 ? (
                    <p className="empty-message">No items in the cart yet.</p>
                ) : (
                    carts.map((item, key) => (
                        <CartItem key={key} data={item} />
                    ))
                )}
            </div>
            <div className="cart-footer">
                <button className="close-btn" onClick={handleCloseTabCart}>CLOSE</button>
                <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT</button>
            </div>
        </div>
    );
};

export default CartTab;
