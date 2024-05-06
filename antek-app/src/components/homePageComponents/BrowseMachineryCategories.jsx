import React from "react";
import { LogoLeftPart, LogoRightPart } from "../../assets";
import { useNavigate } from "react-router-dom";
function BrowseMachineryCategories() {
  const navigate = useNavigate();
  return (
    <div
      className="browse-machinery-categories-container-parent container"
      id="scrollToElement"
    >
      <p>We Promise To Find You The Right Equipment</p>
      <h3>Browse Machinery Categories</h3>
      <div className="heading-logo-section-container-for-slider">
        <img src={LogoLeftPart} alt="logo left part" />
        <img src={LogoRightPart} alt="logo right part" />
      </div>
      <div className="browse-machinery-categories-container-child">
        <div
          className="common-pointer browse-machinery-categories-container-child-image"
          onClick={() => navigate("/product/1")}
        >
          <img
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/water-truck-product.64e6c601b79fa495eba8.jpg"
            alt=""
          />
          <h2>Water Truck 1</h2>
        </div>
        <div className="common-pointer browse-machinery-categories-container-child-image" onClick={() => navigate("/product/2")}>
          <img
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/product_2.b67cc42383d3c5f70034.webp"
            alt=""
          />
          <h2>Water Truck 2</h2>
        </div>
      </div>
    </div>
  );
}

export default BrowseMachineryCategories;
