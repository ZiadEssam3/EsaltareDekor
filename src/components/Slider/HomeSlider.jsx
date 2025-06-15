import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.css";

import SliderImage1 from '../../assets/Slider1.png';
import SliderImage2 from '../../assets/Slider2.png';
import SliderImage3 from '../../assets/Slider3.png';

const images = [SliderImage1, SliderImage2, SliderImage3];

function NextArrow(props) {
    const { className, onClick } = props;
    return <div className={`${className} custom-arrow next-arrow`} onClick={onClick} />;
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return <div className={`${className} custom-arrow prev-arrow`} onClick={onClick} />;
}

const HomeSlider = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="ED-slider-container">
            <Slider {...settings}>
                {images.map((src, index) => (
                    <div key={index} className="ED-slider-slide">
                        <img src={src} alt={`Slide ${index + 1}`} className="ED-slider-img" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlider;


/*import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomeSlider.css";

function NextArrow(props) {
    const { className, onClick } = props;
    return <div className={`${className} custom-arrow next-arrow`} onClick={onClick} />;
}

function PrevArrow(props) {
    const { className, onClick } = props;
    return <div className={`${className} custom-arrow prev-arrow`} onClick={onClick} />;
}

const HomeSlider = ({images}) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    console.log(images);
    return (
        <div className="ED-slider-container">
            <Slider {...settings}>
                {Array.isArray(images) && images.map((item, index) => (
                    <div key={index} className="ED-slider-slide">
                        <img src={item.image} alt={`Slide ${item.title}`} className="ED-slider-img" />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HomeSlider;*/
