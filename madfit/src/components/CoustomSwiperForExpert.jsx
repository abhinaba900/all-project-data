import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";

function CustomSwiperForExpert() {
  return (
    <div>
      <Swiper
        spaceBetween={30} // Space between slides
        pagination={{
          clickable: true, // Makes pagination bullets clickable
        }}
        modules={[Pagination]} // Registers the Pagination module
        className="mySwiper" // Custom class for styling
        slidesPerView={1} // Number of slides per view
        loop={true} // Enables loop mode
      >
        {/* First Slide */}
        <SwiperSlide>
          <div>
            <img
              src="https://coral-app-akhln.ondigitalocean.app/static/media/expert2.8706d36c243f425859b2.jpg"
              alt=""
            />
            <h4>Arianna</h4>
            <p>
              MadFit’s certified yoga instructor. Arianna brings moving and
              spiritual yoga to the MadFit library.
            </p>
          </div>
        </SwiperSlide>
        {/* Second Slide */}
        <SwiperSlide>
          <div>
            <img
              src="https://coral-app-akhln.ondigitalocean.app/static/media/expert1.a4a792fef6ce15070e54.jpg"
              alt=""
            />
            <h4>Maddie</h4>
            <p>
              MadFit founder and fitness expert. Maddie’s personal style is
              loved by over 10 million followers online.
            </p>
          </div>
        </SwiperSlide>
        
      </Swiper>
    </div>
  );
}

export default CustomSwiperForExpert;