import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import required modules
import {
  LogoLeftPart,
  LogoRightPart,
  FirstBackGroundLogoForSlider,
  SecondBackGroundLogoForSlider,
} from "../../assets";

export default function ImageAndTextSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="image-and-text-slider-container-parent">
      <Slider {...settings}>
        <div className="slider-item">
          <img
            src={FirstBackGroundLogoForSlider}
            className="logo-background-img"
            alt=""
          />
          <div className="text-container-for-slider-for-home-page-parent">
            <div className="heading-logo-section-container-for-slider-2">
              <img
                src={LogoLeftPart}
                alt="logo left part"
                className="left-logo"
              />
              <img
                src={LogoRightPart}
                alt="logo right part"
                className="right-logo"
              />
            </div>
            <div className="white-top-section-text">
              <h3>Your One-Stop Source For All Equipment Rental Needs</h3>
              <span>
                Top-Of-The-Line Equipment Ready At Flexible Rates Around
              </span>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <img
            src={SecondBackGroundLogoForSlider}
            alt=""
            className="logo-background-img"
          />
          <div className="text-container-for-slider-for-home-page-parent">
            <div className="heading-logo-section-container-for-slider-2">
              <img
                src={LogoLeftPart}
                alt="logo left part"
                className="left-logo"
              />
              <img
                src={LogoRightPart}
                alt="logo right part"
                className="right-logo"
              />
            </div>
            <div className="white-top-section-text">
              <h3>Top-Of-The-Line Equipment Ready At Flexible Rates Around</h3>
              <span>Your One-Stop Source For All Equipment Rental Needs</span>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
