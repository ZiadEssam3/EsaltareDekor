import React, { useEffect, useRef, useState } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import HomeSlider from '../../components/Slider/HomeSlider';
import { Deals, Sale } from '../../assets/assets';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Title from '../../components/Title/Title';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import SuperDeals from '../../components/SuperDeals/SuperDeals';
import SaleCard from '../../components/SaleCard/SaleCard';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import { fetchNewArrivalsData } from '../../services/NewArrivalsService';
import { getBrandAds } from '../../services/brandAdsService';
import { Link } from 'react-router-dom';
import { ClipLoader } from "react-spinners";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
const Home = () => {
    const [newArrivals, setNewArrivals] = useState([]);
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const loadNewArrivals = async () => {
            try {
                const data = await fetchNewArrivalsData();
                setNewArrivals(data);
            } catch (error) {
                console.error('Failed to load new arrivals', error);
            }
        };
        loadNewArrivals();
    }, []);
    const handleNext = () => {
        setIndex((prev) => (prev + 1) % newArrivals.length);
    };
    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + newArrivals.length) % newArrivals.length);
    };
    const sliderRef = useRef(null);
    // Apply transform when index changes
    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${index * 220}px)`;
        }
    }, [index]);
    // Branding 
    const [ads, setAds] = useState(null);

    useEffect(() => {
        getBrandAds()
            .then(data => setAds(data))
            .catch(err => console.error(err));
    }, []);
    if (!ads) return <LoadingSpinner />;
    // console.log(ads.slider);
    console.log(ads.sale);
    return (
        <div>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="container py-4">
                {/* Top row: Slider and Sale Image */}
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <HomeSlider images={ads.slider || []} />
                    </div>
                    <div className="col-md-4">
                        <img src={ads.sale[0].image} alt="Sale Deal" className="img-fluid rounded" />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-6 col-md-3">
                        <img src={Deals.Deal1} alt="Item 1" className="img-fluid rounded" />
                    </div>
                    <div className="col-6 col-md-3">
                        <img src={Deals.Deal2} alt="Item 2" className="img-fluid rounded" />
                    </div>
                    <div className="col-6 col-md-3 mt-3 mt-md-0">
                        <img src={Deals.Deal3} alt="Item 3" className="img-fluid rounded" />
                    </div>
                    <div className="col-6 col-md-3 mt-3 mt-md-0">
                        <img src={Deals.Deal1} alt="Item 4" className="img-fluid rounded" />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col">
                        <img src={ads.banner[0].image} alt="Furniture Sale Banner" className="ED-Banner-sale rounded" />
                    </div>
                </div>
            </div>

            <Title title="Our Category" />
            <CategoryMenu />

            <div className='ED-Deals'>
                <SuperDeals products={newArrivals || []} bgColor="#ff9980" cardBgColor="#ffd1d1" title='Super Deals' />
                <SuperDeals products={newArrivals || []} bgColor="#f2ebb8" cardBgColor="#f7facd" title='Mega Deals' />
            </div>

            <Title title="Basics Give Up a Set down to Rest" />

            <div className='ED-Sale'>
                <SaleCard imageSrc={Sale.Sale1} discountText="Sale 20%" />
                <SaleCard imageSrc={Sale.Sale1} discountText="Sale 40%" />
                <SaleCard imageSrc={Sale.Sale1} discountText="Sale 50%" />
            </div>

            <Title title="Our Brands" />
            <BrandSlider />

            <Title title="New Arrivals" />
            <div className="ED-product-2-slider-container">
                <button className="nav-button prev" onClick={handlePrev}>
                    &#10094;
                </button>

                <div className="ED-product-2-slider-wrapper">
                    <div className="ED-slider" ref={sliderRef}>
                        {newArrivals.map((product, i) => (
                            <ProductCard2
                                key={i}
                                id={product.id}
                                image={product.image}
                                title={product.title}
                                originalprice={product.originalPrice}
                                discount={product.discount}
                                slug={product.slug}
                                rating={product.rating}
                                category={product.category}
                                description={product.description}
                            />
                        ))}
                    </div>
                </div>

                <button className="nav-button next" onClick={handleNext}>
                    &#10095;
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
