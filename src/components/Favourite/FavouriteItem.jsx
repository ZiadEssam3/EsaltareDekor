import React, { useState, useEffect } from 'react';
import { NewArrivals } from '../../assets/assets';
import { useDispatch } from 'react-redux';
import { removeFromFav } from '../../stores/favourite';
import './FavouriteItem.css';

const FavItem = (props) => {
    const { productId } = props.data;
    const [detail, setDetail] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const findDetail = NewArrivals.find(product => product.id === productId);
        setDetail(findDetail);
    }, [productId]);

    const handleRemove = () => {
        dispatch(removeFromFav({ productId }));
    };

    return (
        <div className="fav-item">
            <img src={detail.image} alt={detail.title} className="fav-item-img" />
            <div className="fav-item-info">
                <h3 className="fav-item-name">{detail.title}</h3>
                <p className="fav-item-price">${detail.price}</p>
            </div>
            <button className="fav-remove-btn" onClick={handleRemove}>Remove</button>
        </div>
    );
};

export default FavItem;
