import React from "react";
import {
  SvgHand,
  ClockForHeading,
  ExitButtonForHeading,
  FacebookImageForHeading,
  InstagramImageForHeading,
  TelegramImageForHeading,
  WhatsAppImageForHeading,
  TwitterImageForHeading,
  YoutubeImageForHeading,
} from "../../assets";
import { useNavigate } from "react-router-dom";

function AboveHeadSection() {
  const navigate = useNavigate();
  const { name } = JSON.parse(localStorage.getItem("data") || false);
  return (
    <div className="head-section">
      <div className="head-image-and-text-common-section">
        <img src={SvgHand} alt="hand logo" />
        <h3 className="white-top-section-text">
          Latest Updates Get Upto 45% Off The Best Construction Equipment <br />{" "}
          Deals At Antek
        </h3>
      </div>
      <div className="head-image-and-text-common-section">
        <img src={ClockForHeading} alt="clock logo" />
        <h3 className="white-top-section-text ">Mon - Sat 9.00 - 18.00</h3>
      </div>
      <div className="head-image-and-text-common-section common-pointer">
        {name ? (
          <h3 className="white-top-section-text">{name}</h3>
        ) : (
          <div
            onClick={() => navigate("/login-SIGHUP")}
            className="head-image-and-text-common-section common-pointer"
          >
            <img src={ExitButtonForHeading} alt="exit button logo" />
            <h3 className="white-top-section-text less-opacity ">
              Login or Register
            </h3>
          </div>
        )}
      </div>
      <div className="logo-section-for-heading">
        <img
          className="common-pointer"
          src={FacebookImageForHeading}
          alt="facebook image for heading"
          onClick={() =>
            window.open("https://www.facebook.com/login.php/", "_blank")
          }
        />
        <img
          className="common-pointer"
          src={InstagramImageForHeading}
          alt="instagram image for heading"
          onClick={() =>
            window.open("https://www.instagram.com/accounts/login/", "_blank")
          }
        />
        <img
          className="common-pointer"
          src={TelegramImageForHeading}
          alt="telegram image for heading"
          onClick={() =>
            window.open("https://web.telegram.org/#/login", "_blank")
          }
        />
        <img
          className="common-pointer"
          src={WhatsAppImageForHeading}
          alt="whatsapp image for heading"
          onClick={() => window.open("https://web.whatsapp.com/", "_blank")}
        />
        <img
          className="common-pointer"
          src={TwitterImageForHeading}
          alt="twitter image for heading"
          onClick={() => window.open("https://twitter.com/login", "_blank")}
        />
        <img
          className="common-pointer"
          src={YoutubeImageForHeading}
          alt="youtube image for heading"
          onClick={() => window.open("https://www.youtube.com/", "_blank")}
        />
      </div>
    </div>
  );
}

export default AboveHeadSection;
