import React, { useEffect, useRef, useState } from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import HomeSlider from '../../components/Slider/HomeSlider';
import { Slider_Images, Sale } from '../../assets/assets';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Title from '../../components/Title/Title';
import CategoryMenu from '../../components/CategoryMenu/CategoryMenu';
import SuperDeals from '../../components/SuperDeals/SuperDeals';
import SaleCard from '../../components/SaleCard/SaleCard';
import BrandSlider from '../../components/BrandSlider/BrandSlider';
import ProductCard2 from '../../components/ProductCard2/ProductCard2';
import { getAdvertisedata } from '../../services/brandAdsService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { getNewArrivalsProducts, getSuperDealsProducts, getMegaDealsProducts } from '../../services/NewArrivalsService';

const Home = () => {

    const baseURL = 'http://127.0.0.1:8000';

    const [index, setIndex] = useState(0);

    const [adsdata, setAdsData] = useState(null);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [superdeals, SetSuperDeals] = useState([]);
    const [megadeals, SetMegaDeals] = useState([]);

    

    const handleNext = () => {
        setIndex((prev) => (prev + 1) % products.length);
    };

    const handlePrev = () => {
        setIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.style.transform = `translateX(-${index * 220}px)`;
        }
    }, [index]);

    

    useEffect(() => {
        getAdvertisedata()
            .then(data => setAdsData(data))
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getNewArrivalsProducts();
                console.log("New Arrivals data:", data);
                setProducts(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);


    useEffect(() => {
        const fetchSuperDealsProducts = async () => {
            try {
                const data = await getSuperDealsProducts();
                console.log("Super Deals data:", data);
                SetSuperDeals(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchSuperDealsProducts();
    }, []);

    useEffect(() => {
        const fetchSuperMegaProducts = async () => {
            try {
                const data = await getMegaDealsProducts();
                console.log("Mega Deals data:", data);
                SetMegaDeals(data);
            } catch (err) {
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchSuperMegaProducts();
    }, []);

    if (loading) return <LoadingSpinner />;
    if (error) return <p className="text-danger text-center py-5">{error}</p>;
    
    return (
        <div>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="container py-4">
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <HomeSlider />
                    </div>
                    <div className="col-md-4">
                        {adsdata?.[0]?.image && (
                            <img src={`${baseURL}${adsdata[0].image}`} alt="Sale Deal" className="img-fluid rounded" />
                            // <img src={ads.sale[0].image} alt="Sale Deal" className="img-fluid rounded" />
                        )}
                    </div>
                </div>



                <div className="row mt-3">
                    {adsdata.slice(1, 5).map((ad, index) => (
                        <div key={index} className="col-6 col-md-3 mt-3 mt-md-0">
                            <img
                                src={`${baseURL}${ad.image}`}
                                alt={ad.title || `Item ${index + 1}`}
                                className="img-fluid rounded"
                            />
                        </div>
                    ))}
                </div>


                <div className="row mt-4">
                    <div className="col">
                        {adsdata?.[5]?.image && (
                            <img src={`${baseURL}${adsdata[5].image}`} alt="Furniture Sale Banner" className="ED-Banner-sale rounded" />
                        )}

                    </div>
                </div>
            </div>

            <Title title="Our Category" />
            <CategoryMenu />

            <div className='ED-Deals'>
                <SuperDeals products={superdeals || []} bgColor="#ff9980" cardBgColor="#ffd1d1" title='Super Deals' />
                <SuperDeals products={megadeals || []} bgColor="#f2ebb8" cardBgColor="#f7facd" title='Mega Deals' />
            </div>

            <Title title="Basics Give Up a Set down to Rest" />
            <div className='ED-Sale'>
                <SaleCard imageSrc={Sale.Sale1} discountText="Sale 20%" />
                <SaleCard imageSrc={Sale.Sale2} discountText="Sale 40%" />
                <SaleCard imageSrc={Sale.Sale3} discountText="Sale 50%" />
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
                        {Array.isArray(products) && products.map((product, i) => (
                            <ProductCard2
                                key={i}
                                id={product.id}
                                image={`${baseURL}${product.image}`}
                                title={product.name}
                                originalprice={product.price}
                                discount={product.sale}
                                category={product.category_id}
                                description={product.description.replace(/<[^>]+>/g,'')}
                                slug={product.id}
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
