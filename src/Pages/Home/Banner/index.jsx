import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from 'react';
import { EffectCoverflow, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './style.css';
// import fetchData from "../../../Utilies/FetchData";

export default function Banner() {

    



    const [slide, setSlide] = useState()
    // useEffect(() => {
    //     (async () => {
    //         const res = await fetchData('sliders?populate=*')
    //         setSlide(res.data)
    //     })
    // }, [])

    useEffect(() => {
        (async () => {
            const res = await fetch ("http://localhost:1337/api/sliders?populate=*");
            console.log('API response:', res);  // Check the data
            setSlide(res.data)
            console.log('Image URL:', "http://localhost:1337/api/sliders?populate=*.Image[0]?.url");

            // http://localhost:1337/uploads/p_masonry_img_02_3297607825.jpg
        })();
    }, []);


    useEffect(() => {
        console.log('Slides:', slide);

    }, [slide]);

    const items = slides.map((slide, index) => (
        <SwiperSlide key={index}>
            {/* Use the full URL to display the image */}
            {slide?.attributes?.images?.data?.[0]?.attributes?.url && (
                <img
                    src={`http://localhost:1337${slide.attributes.images.data[0].attributes.url}`}
                    alt={`Slide ${index}`}
                />
            )}
        </SwiperSlide>
            ));



    // const items =
    // // <img src="https://swiperjs.com/demos/images/nature-1.jpg" />

    //  slide?.map((e,index)=> <SwiperSlide key={index}>
    //     <img src={import.meta.env.VITE_BASE_URL+e?.attributes.images.data[0].attributes.url}></img>
    //     console.log(img);
    //     </SwiperSlide>)

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
    )
}

