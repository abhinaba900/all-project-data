import React from "react";
import { LogoLeftPart, LogoRightPart } from "../../assets";
function AboutAntekEquipmentsRental() {
  return (
    <div className="about-antek-equipments-rental-container-parent">
      <div className="about-antek-equipments-rental-container-child container">
        <img
          className="about-antek-equipments-rental-container-child-image"
          src="https://bitpastel.io/mi/rammoy/construction1/static/media/5th-sec-photo.894fea0abcb946563441.webp"
          alt="logo image for about antek"
        />

        <div className="about-antek-equipments-rental-container-child-text">
          <p className="sixth-about">About Antek Equipments Rental</p>
          <h3>
            We Offer Smarter & More Affordable Access To Rent Construction
            Equipment
          </h3>
          <div className="heading-logo-section-container-for-slider">
            <img src={LogoLeftPart} alt="left logo" />
            <img src={LogoRightPart} alt="right logo" />
          </div>
          <p className="sixth-about">
            Aiusmod tempor incididunt ut labore sed dolore magna aliquay dnim ad
            minim veniam quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea reprehen deritin voluptate.
          </p>
          <div className="about-antek-equipments-rental-container-child-text-child">
            <h2>The Facilities Less Expensive</h2>
            <p className="sixth-about">
              Velit esse cillum dolore ipsum eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="about-antek-equipments-rental-container-child-text-child">
            <h2>The Facilities Less Expensive</h2>
            <p className="sixth-about">
              Velit esse cillum dolore ipsum eu fugiat nulla pariatur.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutAntekEquipmentsRental;
