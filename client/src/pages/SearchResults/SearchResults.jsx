import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './SearchResults.css';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import Footer from '../../components/Footer/Footer';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

const SearchPage = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSearchResults = async () => {
            setLoading(true);
            try {
                const response = await axios.post('http://127.0.0.1:8000/api/search/all', {
                    q: query
                });

                if (response.data && response.data.products) {
                    const filteredResults = response.data.products.filter(product =>
                        product.name.toLowerCase().includes(query.toLowerCase())
                    );
                    setResults(filteredResults);
                } else {
                    setResults([]);
                }
            } catch (error) {
                console.error('Search failed:', error);
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="search-results-page">
                <h2 className="search-results-title">Search Results for: <span className='q-ED-color'>'{query}'</span></h2>
                {loading ? (
                    <p className="search-loading"><LoadingSpinner /></p>
                ) : results.length === 0 ? (
                    <p className="search-no-results">No results found.</p>
                ) : (
                    <ul className="search-results-list">
                        {results.map((product) => (
                            <li className="search-result-item" key={product.id}>
                                <Link to={`/product/${product.id}`} className="search-result-link">
                                    <img
                                        className="search-result-image"
                                        src={`http://127.0.0.1:8000/storage/${product.image}`}
                                        alt={product.name}
                                    />
                                    <div className="search-result-details">
                                        <p className="search-result-name">{product.name}</p>
                                        <p className="search-result-price">{product.price} EGP</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SearchPage;
