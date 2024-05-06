import React from 'react'
import {
  RightArrow,
  LogoLeftPart,
  LogoRightPart,
  FacebookImageForHeading,
  InstagramImageForHeading,
  TelegramImageForHeading,
  WhatsAppImageForHeading,
  TwitterImageForHeading,
  YoutubeImageForHeading,
  CartForFooter,
} from "../../assets";

function Footer() {
  return (
    <footer className="footer-main-container">
      <div className="first-footer-component">
        <img
          src="https://bitpastel.io/mi/rammoy/construction1/static/media/footer-logo.c96bc4ae2df7d513a4ce.webp"
          alt="main logo image"
        />

        <div className="first-footer-component-text">
          <h2>Newsletter Subscription</h2>
          <p>Get Latest Deals from Antek Equipment Rentals</p>
        </div>

        <div className="first-footer-component-search-section">
          <input
            type="search"
            name=""
            placeholder="Your Email"
            id="search-input-for-footer-component"
          />
          <button>
            Subscribe <img src={RightArrow} alt="right arrow" />
          </button>
        </div>
      </div>
      <div className="second-footer-component">
        <div className="second-footer-component-common">
          <span>ABOUT ANTEK</span>
          <div className="heading-logo-section-container-for-slider">
            <img src={LogoLeftPart} alt="logo left part" />
            <img src={LogoRightPart} alt="logo right part" />
          </div>
          <p>
            Aiusmod tempor incididunt labore dnim ad minim veniam quis nostrsd
            exercitation ullamco.
          </p>
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
                window.open(
                  "https://www.instagram.com/accounts/login/",
                  "_blank"
                )
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
        <div className="second-footer-component-common">
          <span>USEFUL LINKS</span>
          <div className="heading-logo-section-container-for-slider">
            <img src={LogoLeftPart} alt="logo left part" />
            <img src={LogoRightPart} alt="logo right part" />
          </div>
          <ul className="sixth-about">
            <li>About Rental</li>
            <li>Latest News</li>
            <li>Our Process</li>
            <li>Terms & Conditions</li>
            <li>Protections & Coverages</li>
          </ul>
        </div>
        <div className="second-footer-component-common">
          <span>EXPLORE ANTEK</span>
          <div className="heading-logo-section-container-for-slider">
            <img src={LogoLeftPart} alt="logo left part" />
            <img src={LogoRightPart} alt="logo right part" />
          </div>
          <ul className="sixth-about">
            <li>Signup or Register</li>
            <li>Get Equipments</li>
            <li>Rental Pricing</li>
            <li>Quick User Guide</li>
            <li>Read FAQ’s</li>
          </ul>
        </div>
        <div className="second-footer-component-common">
          <span>GET IN TOUCH</span>
          <div className="heading-logo-section-container-for-slider">
            <img src={LogoLeftPart} alt="logo left part" />
            <img src={LogoRightPart} alt="logo right part" />
          </div>
          <div className="sixth-about-cart-with-text">
            <div className="sub-div-main">
              <img src={CartForFooter} alt="cart for footer" />
              <div className="text-section-logo-cart">
                <p className="sixth-about">For Rental Support</p>
                <h4>+1 (236) 799 5500 / 6600</h4>
              </div>
            </div>
            <div className="sub-div-main">
              <img src={CartForFooter} alt="cart for footer" />
              <div className="text-section-logo-cart">
                <p className="sixth-about">The Office Hours</p>
                <h4>Mon - Sat 8am to 6pm</h4>
              </div>
            </div>
            <div className="sub-div-main">
              <img src={CartForFooter} alt="cart for footer" />
              <div className="text-section-logo-cart">
                <p className="sixth-about">Send Us Email</p>
                <h4>rentals@my-domain.net</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-last-component">
        <p className="sixth-about">© 2022 Antek Construction Equipment Rental</p>
      </div>
    </footer>
  );
}

export default Footer
