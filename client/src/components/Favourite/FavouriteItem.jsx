import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Add useSelector
import { removeFromFav } from '../../stores/favourite';
import './FavouriteItem.css';
import { getCookie } from '../../utils/config';
import axios from 'axios';
import { toast } from 'react-toastify';

const baseURL = 'http://127.0.0.1:8000';

const FavItem = ({ data }) => {
    const dispatch = useDispatch();
    const token = getCookie('token');
    // Get favorites from Redux
    const favorites = useSelector((state) => state.favorites.favorites); 
    const handleRemove = async () => {
        // Find the favorite item that matches this product
        const favouriteItem = favorites.find(
            // Compare product IDs
            (item) => item.product.id === data.id 
        );
        if (!favouriteItem) {
            toast.error("Item not found in favorites!");
            return;
        }
        // Use the fav id 
        const favouriteItemId = favouriteItem.id;

        try {
            // 3. Send the correct ID to the API
            await axios.delete(`${baseURL}/api/favourites/${favouriteItemId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            // 4. Update Redux state
            dispatch(removeFromFav({ id: favouriteItemId }));
            toast.success("Removed from favorites!");
        } catch (error) {
            console.error("Delete failed:", error.response?.data);
            toast.error("Failed to remove from favorites.");
        }
    };

    return (
        <div className="fav-item">
            <img
                src={`${baseURL}${data.image}`}
                alt={data.name}
                className="fav-item-img"
            />
            <div className="fav-item-info">
                <h3 className="fav-item-name">{data.name}</h3>
                <p className="fav-item-price">${parseFloat(data.price).toFixed(2)}</p>
            </div>
            <button className="fav-remove-btn" onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default FavItem;