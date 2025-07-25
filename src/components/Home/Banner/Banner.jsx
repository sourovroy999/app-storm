
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';


// import required modules
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
    return (
        <div className='my-4'>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper h-[480px] ">
        <SwiperSlide ><img className='object-cover w-full h-full' src="https://i.ibb.co/YFvPPLX1/drinks.jpg" alt="" /></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
         
      </Swiper>
            
        </div>
    );
};

export default Banner;