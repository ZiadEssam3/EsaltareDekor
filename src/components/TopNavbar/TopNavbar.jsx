import React, { useEffect } from 'react';
import './TopNavbar.css';
import { TbCirclePercentageFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscountCode } from '../../stores/discountSlice';

const TopNavbar = () => {
    const dispatch = useDispatch();
    const { code, percentage } = useSelector((state) => state.discount);

    useEffect(() => {
        dispatch(getDiscountCode());
    }, [dispatch]);

    return (
        <>
            <div className='topnavbar'>
                <div className='topnavbar-content'>
                    <p className='topnavbar-content-para'>
                        Sale Up To {percentage}% Use The code <span className='topnavbar-code'>{code}</span> for Sale {" "}
                        <TbCirclePercentageFilled className='topnavbar-percentage-icon' size={13} />
                    </p>
                </div>
            </div>
            <div className='ED-Home-page-links'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/categories">Categories</Link></li>
                    <li><Link to="/contact">ContactUs</Link></li>
                    <li><Link to="/designer">3D Designer</Link></li>
                    <li><Link to="/compare">Compare</Link></li>
                    <li><Link to="/search">AllProducts</Link></li>
                </ul>
            </div>
        </>
    )
}

export default TopNavbar;
