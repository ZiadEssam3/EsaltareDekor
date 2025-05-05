import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { FaHeart } from "react-icons/fa";
import { LiaShoppingCartSolid } from "react-icons/lia";
import { FaRegUserCircle } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';  // Use `useNavigate` here
import { toggleStatusTab, setCartFromStorage } from '../../stores/cart';
import { toggleStatusTabFav, setFavFromStorage } from '../../stores/favourite';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [favCount, setFavCount] = useState(0); // Track favorite count
    const [searchQuery, setSearchQuery] = useState(''); // Store the search query
    const [searchResults, setSearchResults] = useState([]); // Store the search results
    const dispatch = useDispatch();
    const navigate = useNavigate();  // Use `useNavigate` instead of `useHistory`
    const carts = useSelector(store => store.cart.items);
    const favorites = useSelector(store => store.favorites.favorites); // Get favorites from the store
    const products = useSelector(store => store.products.items); // Assuming you have a product list in the Redux store

    // استرجاع البيانات من localStorage عند تحميل Navbar
    useEffect(() => {
        const storedCart = localStorage.getItem("carts");
        if (storedCart) {
            const items = JSON.parse(storedCart);
            dispatch(setCartFromStorage(items));
        }

        const storedFav = localStorage.getItem("favorites");
        if (storedFav) {
            const favItems = JSON.parse(storedFav);
            dispatch(setFavFromStorage(favItems));  // Initialize favorites from localStorage
        }
    }, [dispatch]);

    // حساب عدد العناصر في السلة
    useEffect(() => {
        let total = 0;
        carts.forEach(item => total += item.quantity);
        setTotalQuantity(total);
    }, [carts]);

    // حساب عدد العناصر في المفضلة
    useEffect(() => {
        setFavCount(favorites.length);
    }, [favorites]);

    // وظيفة البحث
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            const results = products.filter(product =>
                product.title.toLowerCase().includes(query.toLowerCase()) // البحث داخل عنوان المنتج
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    // الذهاب إلى صفحة نتائج البحث عند الضغط على النتيجة
    const handleSearchResultClick = (slug) => {
        navigate(`/search/${slug}`); // Use `navigate` instead of `history.push`
    };

    const handleCartClick = () => {
        dispatch(toggleStatusTab());
    };

    const handleFavClick = () => {
        dispatch(toggleStatusTabFav());  // Toggle favorites tab
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
                    {favCount > 0 && <span className='ED-fav-count'>{favCount}</span>} {/* Display favorite count */}
                </li>
                <li className='ED-Navbar-ul-li cart-icon' onClick={handleCartClick}>
                    <LiaShoppingCartSolid size={20} />
                    Your Cart
                    {totalQuantity > 0 && <span className='ED-cart-count'>{totalQuantity}</span>}
                </li>
                <Link to='/myprofile' className='ED-myprofile'>
                    <li className='ED-Navbar-ul-li'>
                        <FaRegUserCircle size={20} />
                        My Account
                    </li>
                </Link>

            </ul>
        </div>
    );
};

export default Navbar;
