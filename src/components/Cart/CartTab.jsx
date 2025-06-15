import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartItem from './CartItem';
import { toggleStatusTab, setCartFromStorage } from '../../stores/cart';
import { getAllCartItems } from '../../services/NewArrivalsService';
import Cookies from 'js-cookie';
import './CartTab.css';
import { useNavigate } from 'react-router-dom';

const CartTab = () => {
    const carts = useSelector(store => store.cart.items);
    const statusTab = useSelector(store => store.cart.statusTab);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = Cookies.get('token');
    const [forceUpdate, setForceUpdate] = useState(0);

    // استدعاء API لجلب محتويات السلة عند أي تغيير
    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const data = await getAllCartItems(token);
                dispatch(setCartFromStorage(data));
            } catch (error) {
                console.error('Failed to fetch cart items:', error);
            }
        };
        
        fetchCartData();
        
        // يمكنك إضافة EventListener للتحديث عند حدوث أي تغيير
        window.addEventListener('cartUpdated', fetchCartData);
        
        return () => {
            window.removeEventListener('cartUpdated', fetchCartData);
        };
    }, [token, dispatch, forceUpdate]);

    const handleCloseTabCart = () => {
        dispatch(toggleStatusTab());
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    // دالة لتحفيز التحديث
    const triggerCartUpdate = () => {
        setForceUpdate(prev => prev + 1);
    };

    return (
        <div className={`cart-tab ${statusTab ? 'open' : ''}`}>
            <h2 className="cart-header">Shopping Cart</h2>
            <div className="cart-body">
                {carts.length === 0 ? (
                    <p className="empty-message">No items in the cart yet.</p>
                ) : (
                    carts.map((item) => (
                        <CartItem 
                            key={item.productId} 
                            data={item} 
                            onUpdate={triggerCartUpdate}
                        />
                    ))
                )}
            </div>
            <div className="cart-footer">
                <button className="close-btn" onClick={handleCloseTabCart}>CLOSE</button>
                <button 
                    className="checkout-btn" 
                    onClick={handleCheckout}
                    disabled={carts.length === 0}
                >
                    CHECKOUT
                </button>
            </div>
        </div>
    );
};

export default CartTab;