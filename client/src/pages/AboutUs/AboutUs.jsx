import React from 'react';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import Navbar from '../../components/Navbar/Navbar';
import BottomNavBar from '../../components/BottomNavbar/BottomNavbar';
import Footer from '../../components/Footer/Footer';
import Title from '../../components/Title/Title';

const About = () => {
    return (
        <>
            <TopNavbar />
            <Navbar />
            <BottomNavBar />
            <div className="row">
                <div className="col mt-5">
                    <Title title="Why Choose Us?" />
                    <p className='text-center fs-5'>
                        At Furniture Store, we pride ourselves on offering an exceptional shopping experience, from high-quality products to excellent customer service.
                    </p>
                </div>
            </div>
            <div className="container py-5">
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <img
                                src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
                                className="card-img-top about-img"
                                alt="Our Mission"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Our Mission</h5>
                                <p className="card-text">
                                    We are dedicated to providing high-quality furniture that combines comfort, style, and durability.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="card">
                            <img
                                src="https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600"
                                className="card-img-top about-img"
                                alt="Our Story"
                            />
                            <div className="card-body">
                                <h5 className="card-title">Our Story</h5>
                                <p className="card-text">
                                    With years of experience, we have curated a collection of furniture that reflects the latest trends while ensuring maximum comfort and quality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />

        </>
    );
};

export default About;
