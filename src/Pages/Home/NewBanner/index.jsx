import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import fetchData from "../../../Utilies/FetchData"

import './style.css';

// Replace with your actual fetchData function if defined elsewhere.
// async function fetchData(endpoint) {
//     const response = await fetch(`http://localhost:1337/api/${endpoint}`);
//     const data = await response.json();
//     return data;
// }

export default function Banner() {
    const [slides, setSlides] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await fetchData('sliders?populate=*'); // Fetch data
            setSlides(res.data) // Assuming res.data contains the array of sliders
            
        })();
    }, []);

    const items = slides.map((slide, index) => (
        <SwiperSlide key={index}>
            {/* Use the full URL to display the image */}
            {slide?.attributes?.images?.data?.[0]?.attributes?.url && (
                <img
                    src={`import.meta.env.VITE_BASE_URL + ${slide.attributes.images.data[0].attributes.url}`}
                    alt={`Slide ${index}`}
                />
            )}
        </SwiperSlide>
    ));

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
                {items}
            </Swiper>
        </>
    );
}