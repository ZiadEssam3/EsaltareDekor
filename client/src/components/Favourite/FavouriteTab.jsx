import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTabFav } from '../../stores/favourite';
import FavItem from './FavouriteItem';
import './FavouriteTab.css';
import axios from 'axios';
import { getCookie } from '../../utils/config';
import { toast } from 'react-toastify';
const baseURL = 'http://127.0.0.1:8000';
const FavTab = () => {
    const statusTab = useSelector(store => store.favorites.statusTab);
    const dispatch = useDispatch();
    const token = getCookie('token');

    const [favItems, setFavItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleCloseTabFav = () => {
        dispatch(toggleStatusTabFav());
    };

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/api/favourites`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFavItems(response.data.data);
        } catch (error) {
            console.error("Failed to fetch favourites:", error);
            toast.error("Could not load favourite items.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (statusTab && token) {
            fetchFavourites();
        }
    }, [statusTab, token]);

    return (
        <div className={`fav-tab ${statusTab ? 'open' : ''}`}>
            <h2 className="fav-header">Favorites</h2>
            <div className="fav-body">
                {loading ? (
                    <p>Loading...</p>
                ) : favItems.length === 0 ? (
                    <p className="empty-message">No favorite items yet.</p>
                ) : (
                    favItems.map((item) => (
                        <FavItem key={item.id} data={item.product} />
                    ))
                )}
            </div>
            <div className="fav-footer">
                <button className="close-btn" onClick={handleCloseTabFav}>CLOSE</button>
            </div>
        </div>
    );
};

export default FavTab;