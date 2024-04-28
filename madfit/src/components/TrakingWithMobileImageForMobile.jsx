import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

function TrakingWithMobileImageForMobile() {
  return (
    <div className="target-carausal-mobile-container">
      <Swiper
        spaceBetween={10}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        slideToClickedSlide={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 2,
          },
          320: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        }}
      >
        <SwiperSlide>
          <div className="Taking-With-Mobile-Image-Container-parent">
            <div className="Taking-With-Mobile-Image-Container">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/mobile-helf2.7ac10beedb58ed82bf0b.png"
                alt="main logo"
              />
            </div>
            <div className="Taking-With-Mobile-Image-Text-Container">
              <h2>TRACKING</h2>
              <p>
                Keep your fitness flowing with tracking features built into the
                app.
              </p>
              <img
                className="circle-image-logo"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
                alt="cercle-image-logo"
              />
              <img
                className="circle-image-logo-2"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
                alt="cercle-image-logo-2"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Taking-With-Mobile-Image-Container-parent">
            <div className="Taking-With-Mobile-Image-Container">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/journal_latest.7a261821dfcf8d6d96f8.png"
                alt="main logo"
              />
            </div>
            <div className="Taking-With-Mobile-Image-Text-Container">
              <h2>JOURNAL</h2>
              <p>
                Record and reflect with journaling features such as a diary,
                selfies and gratitude boxes.
              </p>
              <img
                className="circle-image-logo"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
                alt="cercle-image-logo"
              />
              <img
                className="circle-image-logo-2"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
                alt="cercle-image-logo-2"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Taking-With-Mobile-Image-Container-parent">
            <div className="Taking-With-Mobile-Image-Container">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/mobile-helf.1b4b17c24fc880993a1f.png"
                alt="main logo"
              />
            </div>
            <div className="Taking-With-Mobile-Image-Text-Container">
              <h2>CUSTOM PLAN</h2>
              <p>
                Choose your own exercises, challenges and recipes and build out
                your own schedule.
              </p>
              <img
                className="circle-image-logo"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
                alt="cercle-image-logo"
              />
              <img
                className="circle-image-logo-2"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
                alt="cercle-image-logo-2"
              />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="Taking-With-Mobile-Image-Container-parent">
            <div className="Taking-With-Mobile-Image-Container">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/mobile-helf4.f11197ea19c9946abb1a.png"
                alt="main logo"
              />
            </div>
            <div className="Taking-With-Mobile-Image-Text-Container">
              <h2>UPDATES</h2>
              <p>
                The MadFit app never stays still. Frequent updates with
                exercises, recipes and features.
              </p>
              <img
                className="circle-image-logo"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
                alt="cercle-image-logo"
              />
              <img
                className="circle-image-logo-2"
                src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
                alt="cercle-image-logo-2"
              />
            </div>
          </div>
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
}

export default TrakingWithMobileImageForMobile;
