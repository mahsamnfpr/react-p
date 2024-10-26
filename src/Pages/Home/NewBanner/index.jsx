import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';

async function fetchData(endpoint) {
    try {
        const response = await fetch(`http://localhost:1337/api/${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export default function Banner() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData('sliders?populate=*');
            console.log('API response:', res);  // Log the API response
            if (res && res.data) {
                setSlides(res.data);
            } else {
                console.log('No valid data received from API.');
            }
        })();
    }, []);

    const items = slides.map((slide, index) => {
        const imageUrl = slide.Image[0].url;
        // slide?.attributes?.images?.data?.[0]?.attributes?.url;
        console.log('Image URL:', `http://localhost:1337${imageUrl}`);  // Log each image URL

        return (
            <SwiperSlide key={index}>
                {imageUrl && (
                    <img
                        src={`http://localhost:1337${imageUrl}`}
                        alt={`Slide ${index}`}
                    />
                )}
            </SwiperSlide>
        );
    });

    return (
        <>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                
                pagination={true}
                modules={[EffectCoverflow, Pagination]}
                className="banner"
            >
                {items.length > 0 ? items : <p>Loading slides...</p>}
            </Swiper>
        </>
    );
}
