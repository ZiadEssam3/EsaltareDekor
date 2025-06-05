import React, { useState, useEffect } from 'react';
import { NewArrivals } from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { changeQuantity } from '../../stores/cart';
import './CartItem.css';
import { getCookie } from '../../utils/config';
import axios from 'axios';

const CartItem = (props) => {
    const { productId, quantity } = props.data;
    const [detail, setDetail] = useState(null);
    const dispatch = useDispatch();
    const token = getCookie('authToken');

    useEffect(() => {
        const findDetail = NewArrivals.find(product => product.id === productId);
        setDetail(findDetail);
    }, [productId]);

    const handleMinusQuantity = async () => {
        dispatch(changeQuantity({ productId, quantity: quantity - 1 }));
        console.log(quantity);
        if (quantity === 1) {
            try {
                await axios.delete(`http://web-production-0ba5.up.railway.app/api/cart/${productId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                toast.success('Item removed from cart');
            } catch (error) {
                console.error('Failed to delete item from cart:', error);
                toast.error('Error removing item');
            }
        }
    };

    const handlePlusQuantity = () => {
        dispatch(changeQuantity({ productId, quantity: quantity + 1 }));
    };

    const getCartItems = async () => {
        try {
            const response = await axios.get('http://web-production-0ba5.up.railway.app/api/cart', {
                params: { user_id: userId },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            console.log("Cart items:", response.data);
        } catch (error) {
            console.error("Failed to fetch cart items:", error);
        }
    };
    /*useEffect(() => {
        if (userId && token) {
            getCartItems();
        }
    }, [userId, token]);*/
    //const detail = response.data;  
    //console.log(detail);
    if (!detail) return null;

    return (
        <div className="cart-item">
            <img src={detail.image} alt={detail.title} className="cart-item-img" />
            <h3 className="cart-item-name">{detail.title}</h3>
            <p className="cart-item-price">${(detail.price * quantity).toFixed(2)}</p>
            <div className="cart-item-quantity">
                <button className="quantity-btn" onClick={handleMinusQuantity}>-</button>
                <span>{quantity}</span>
                <button className="quantity-btn" onClick={handlePlusQuantity}>+</button>
            </div>
        </div>
    );
};

export default CartItem;