
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import StormBanner from './StormBanner';

import GlassBanner from './GlassBanner';

import StormThemeBanner from './StormThemeBanner';

const Banner = () => {
    return (
        <div className='mb-4'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-[calc(100vh-72px)] ">
        {/* <SwiperSlide ><img className='object-cover w-full h-full' src="https://i.ibb.co.com/F4DVBzFC/abstract-connected-dots.jpg" alt="" /></SwiperSlide> */}
   
        <SwiperSlide className="h-full">
            <StormBanner/>
        </SwiperSlide>

     

        {/* <SwiperSlide className="h-full">
            <StormThemeBanner/>
            
         </SwiperSlide> */}


        <SwiperSlide className="h-full" >
            <GlassBanner/>
            
         </SwiperSlide>
      
      </Swiper>
            
        </div>
    );
};

export default Banner;