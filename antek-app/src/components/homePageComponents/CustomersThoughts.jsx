import React from "react";
import { LogoLeftPart, LogoRightPart, InvertedComa } from "../../assets";
import { Rating } from "primereact/rating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PiChatCentered } from "react-icons/pi";

function CustomersThoughts() {
  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    spaceBetween: 30,
    PiChatCentered: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="browse-machinery-categories-container-parent container">
      <p>We Promise To Find You The Right Equipment</p>
      <h3>Read Customers Thoughts</h3>
      <div className="heading-logo-section-container-for-slider">
        <img src={LogoLeftPart} alt="logo left part" />
        <img src={LogoRightPart} alt="logo right part" />
      </div>
      <div className="browse-machinery-categories-container-child-revue-section-parent">
        <Slider {...settings} className="container">
          <div className="browse-machinery-categories-container-child-revue-section slider-item-2">
            <img
              className="inverted-coma"
              src={InvertedComa}
              alt="inverted coma"
            />
            <h3>
              Satisfied With The Facilities At Antek Construction Equipment
              Rental
            </h3>
            <p>
              At dolore magna aliqua umt enim ad mini veniam quis ulamco aliquip
              commodo da consequat duis aute irue derit voluptate cillum dolore
              afugiat.
            </p>
            <div className="rating-container-and-name">
              <img
                className="c-ip-reviews__avatar"
                src="https://bitpastel.io/mi/rammoy/construction1/static/media/client_photo_1.50a6aab13c623b4ba2c8.webp"
                alt=""
              />
              <div className="c-ip-reviews__info">
                <h3 className="c-ip-reviews__name">Donald H. James</h3>
                <p className="c-ip-reviews__occupation">Rental Customer</p>
              </div>
              <Rating
                value={3}
                color="yellow"
                readOnly
                cancel={false}
                className="c-ip-reviews__rating"
              />
            </div>
          </div>
          <div className="browse-machinery-categories-container-child-revue-section slider-item-2">
            <img
              className="inverted-coma"
              src={InvertedComa}
              alt="inverted coma"
            />
            <h3>
              Satisfied With The Facilities At Antek Construction Equipment
              Rental
            </h3>
            <p>
              At dolore magna aliqua umt enim ad mini veniam quis ulamco aliquip
              commodo da consequat duis aute irue derit voluptate cillum dolore
              afugiat.
            </p>
            <div className="rating-container-and-name">
              <img
                className="c-ip-reviews__avatar"
                src="https://bitpastel.io/mi/rammoy/construction1/static/media/client_photo_1.50a6aab13c623b4ba2c8.webp"
                alt=""
              />
              <div className="c-ip-reviews__info">
                <h3 className="c-ip-reviews__name">Donald H. James</h3>
                <p className="c-ip-reviews__occupation">Rental Customer</p>
              </div>
              <Rating
                value={4}
                color="yellow"
                readOnly
                cancel={false}
                className="c-ip-reviews__rating"
              />
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
}

export default CustomersThoughts;
