import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getCookie } from '../../utils/config';
import { setCartFromStorage } from '../../stores/cart';
import { getAllCartItems } from '../../services/NewArrivalsService';
import './CartItem.css';

const CartItem = ({ data }) => {
    const IMG_BASE = 'http://127.0.0.1:8000';
    const { product, quantity } = data || {};
    const dispatch = useDispatch();
    const token = getCookie('token');

    if (!product) return null;

    const refreshCart = async () => {
        try {
            const updatedCart = await getAllCartItems(token);
            dispatch(setCartFromStorage(updatedCart));
        } catch (error) {
            console.error('Failed to refresh cart:', error);
        }
    };

    const handleMinusQuantity = async () => {
        if (quantity === 1) {
            try {
                await axios.delete(
                    `${IMG_BASE}/api/cart/${data.id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                toast.success('Item removed from cart');
                await refreshCart();
            } catch (err) {
                console.error('Failed to delete item', err);
                toast.error('Error removing item');
            }
            return;
        }

        try {
            await axios.put(
                `${IMG_BASE}/api/cart/${data.id}`,
                { quantity: String(quantity - 1) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Quantity updated');
            await refreshCart();
        } catch (err) {
            console.error('Failed to update quantity', err);
            toast.error('Error updating quantity');
        }
    };

    const handlePlusQuantity = async () => {
        const newQuantity = quantity + 1;

        try {
            await axios.put(
                `${IMG_BASE}/api/cart/${data.id}`,
                { quantity: String(newQuantity) },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success('Quantity updated');
            await refreshCart();
        } catch (err) {
            console.error('Failed to update quantity', err);
            toast.error('Error updating quantity');
        }
    };

    return (
        <div className="cart-item">
            <img
                src={`${IMG_BASE}${product.image}`}
                alt={product.name}
                className="cart-item-img"
            />
            <h3 className="cart-item-name">{product.name}</h3>

            <p className="cart-item-price">
                ${(parseFloat(product.price) * quantity).toFixed(2)}
            </p>

            <div className="cart-item-quantity">
                <button className="quantity-btn" onClick={handleMinusQuantity}>
                    –
                </button>
                <span>{quantity}</span>
                <button className="quantity-btn" onClick={handlePlusQuantity}>
                    +
                </button>
            </div>
        </div>
    );
};

export default CartItem;
