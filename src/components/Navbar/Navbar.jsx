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
import { toggleStatusTabFav, setFavFromStorage } from '../../stores/favourite';
import { IoStorefront } from "react-icons/io5";
import Cookies from 'js-cookie';
import { useAuthStore } from "../../stores/UserSlice";
import { toast } from 'react-toastify';
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [favCount, setFavCount] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites);
    const products = useSelector(store => store.products.items);
    const { logout, isLoading } = useAuthStore();


    useEffect(() => {
        const storedCart = localStorage.getItem("carts");
        if (storedCart) {
            const items = JSON.parse(storedCart);
            dispatch(setCartFromStorage(items));
        }

        const storedFav = localStorage.getItem("favorites");
        if (storedFav) {
            const favItems = JSON.parse(storedFav);
            dispatch(setFavFromStorage(favItems));
        }
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, [dispatch]);

    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    useEffect(() => {
        setFavCount(favorites.length);
    }, [favorites]);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleSearchResultClick = (slug) => {
        navigate(`/search/${slug}`);
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
                    placeholder='search...'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <CiSearch size={30} />
                {searchQuery.length > 0 && (
                    <ul className="search-results">
                        {searchResults.map((result) => (
                            <li key={result.id} onClick={() => handleSearchResultClick(result.slug)}>
                                {result.title}
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
                    {favCount > 0 && <span className='ED-fav-count'>{favCount}</span>}
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
                                Join as Vendor
                            </li>
                        </Link>
                        <li className='ED-Navbar-ul-li' onClick={handleLogout}>
                            Logout
                        </li>
                    </>
                ) : (
                    <>
                        <Link to='/login' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>
                                Login
                            </li>
                        </Link>
                        <Link to='/signup' className='ED-myprofile'>
                            <li className='ED-Navbar-ul-li'>
                                Signup
                            </li>
                        </Link>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
