import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FaHeart } from "react-icons/fa";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleStatusTab, setCartFromStorage } from '../../stores/cart';
import { toggleStatusTabFav, refreshFavorites } from '../../stores/favourite';
import { IoStorefront } from "react-icons/io5";
import Cookies from 'js-cookie';
import { useAuthStore } from "../../stores/UserSlice";
import { toast } from 'react-toastify';
import { getAllFavouriteItems } from '../../services/NewArrivalsService';
import axios from 'axios';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [favLoading, setFavLoading] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites);
    const products = useSelector(store => store.products.items);
    const { logout } = useAuthStore();

    useEffect(() => {
        const storedCart = localStorage.getItem("carts");
        if (storedCart) {
            const items = JSON.parse(storedCart);
            dispatch(setCartFromStorage(items));
        }

        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
            setFavLoading(true);
            getAllFavouriteItems(token)
                .then(items => {
                    dispatch(refreshFavorites(items));
                })
                .catch(error => {
                    console.error("Failed to fetch favorites:", error);
                })
                .finally(() => {
                    setFavLoading(false);
                });
        } else {
            setFavLoading(false);
        }
    }, [dispatch]);

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim().length > 0) {
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/search/all', {
                    q: query
                });

                if (response.data && response.data.products) {
                    setSearchResults(response.data.products);
                } else {
                    setSearchResults([]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSearchResults([]);
            }
        } else {
            setSearchResults([]);
        }
    };


    const handleSearchResultClick = (id) => {
        navigate(`/product/${id}`);
        setSearchQuery('');
        setSearchResults([]);
    };

    const handleSearchSubmit = () => {
        if (searchQuery.trim() !== '') {
            navigate(`/search/${encodeURIComponent(searchQuery)}`);
            setMenuOpen(false);
            setSearchResults([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        }
    };


    const handleCartClick = () => {
        dispatch(toggleStatusTab());
    };

    const handleFavClick = () => {
        dispatch(toggleStatusTabFav());
    };

    const handleLogout = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) throw new Error("No token found");
            await logout(token);
            Cookies.remove('token');
            setIsLoggedIn(false);
            toast.success('Logout successful!');
            navigate('/');
        } catch (error) {
            toast.error('Error in Logout');
            console.log(error);
        }
    };

    return (
        <div className='ED-Navbar'>
            <Link to="/">
                <img src={assets.ED_logo} alt="ED Logo" className="ED-logo" />
            </Link>

            <div className='ED-search-box'>
                <input
                    type="text"
                    placeholder="search..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <CiSearch size={30} onClick={handleSearchSubmit} style={{ cursor: 'pointer' }} />
                {searchQuery.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map((result) => (
                            <li key={result.id} onClick={() => handleSearchResultClick(result.id)}>
                                {result.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button className='ED-menu-toggle' onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
            </button>

            <ul className={`ED-Navbar-ul ${menuOpen ? 'open' : ''}`}>
                <li className='ED-Navbar-ul-li' onClick={handleFavClick}>
                    <FaHeart size={20} />
                    My Favourite
                    {(
                        favorites.length > 0 && <span className='ED-fav-count'>{favorites.length}</span>
                    )}
                </li>

                <li className='ED-Navbar-ul-li cart-icon' onClick={handleCartClick}>
                    <LiaShoppingCartSolid size={20} />
                    Your Cart
                    {totalQuantity > 0 && <span className='ED-cart-count'>{totalQuantity}</span>}
                </li>

                {isLoggedIn ? (
                    <>
                        <Link to='/myprofile' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>
                                <FaRegUserCircle size={20} />
                                My Account
                            </li>
                        </Link>
                        <Link to='/vendorhome' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>
                                <IoStorefront size={20} />
                                Vendor Panel
                            </li>
                        </Link>
                        <li className='ED-Navbar-ul-li' onClick={handleLogout}>
                            Logout
                        </li>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>Login</li>
                        </Link>
                        <Link to='/signup' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>Signup</li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
