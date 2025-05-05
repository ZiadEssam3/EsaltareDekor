import React, { useEffect, useRef } from 'react';
import './BrandSlider.css';
import { brands } from '../../assets/assets';

const BrandSlider = () => {
    const sliderRef = useRef(null);
    const position = useRef(0);
    const speed = 1; // pixels per frame
    const itemWidth = 190; // width + margin

    useEffect(() => {
        const slider = sliderRef.current;

        let animation;

        const scroll = () => {
            position.current += speed;
            if (position.current >= brands.length * itemWidth) {
                position.current = 0;
                slider.style.transition = 'none';
                slider.style.transform = `translateX(0px)`;
            } else {
                slider.style.transition = 'transform 4s linear';
                slider.style.transform = `translateX(-${position.current}px)`;
            }

            animation = requestAnimationFrame(scroll);
        };

        animation = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animation);
    }, []);

    return (
        <div className="slider-container">
            <div className="slider-wrapper">
                <div className="slider" ref={sliderRef}>
                    {[...brands, ...brands].map((src, i) => (
                        <img key={i} src={src} alt={`slide-${i}`} className="slider-image" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BrandSlider;
