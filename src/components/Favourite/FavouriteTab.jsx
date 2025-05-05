import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleStatusTabFav } from '../../stores/favourite';
import FavItem from './FavouriteItem';
import './FavouriteTab.css';

const FavTab = () => {
    const favorites = useSelector(store => store.favorites.favorites);
    const statusTab = useSelector(store => store.favorites.statusTab);
    const dispatch = useDispatch();

    const handleCloseTabFav = () => {
        dispatch(toggleStatusTabFav());
    };

    return (
        <div className={`fav-tab ${statusTab ? 'open' : ''}`}>
            <h2 className="fav-header">Favorites</h2>
            <div className="fav-body">
                {favorites.length === 0 ? (
                    <p className="empty-message">No favorite items yet.</p>
                ) : (
                    favorites.map((item) => (
                        <FavItem key={item.productId} data={item} />
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
