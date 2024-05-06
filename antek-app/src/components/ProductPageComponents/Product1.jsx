import "../css/Product.css";
import Footer from "../homePageComponents/Footer";

import React, { useEffect, useRef, useState } from "react";
import { Calendar } from "primereact/calendar";

import {
  LogoLeftPart,
  LogoRightPart,
  CalendarLogo,
  TickLogo,
  RightArrow,
} from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
function Product1() {
  const { data } = useParams();
  const currentDate = new Date();
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const navigate = useNavigate();
  const { address, dates=[currentDate, nextDate], shipping } = JSON.parse(data || "{}");

  const [userData, setUserData] = useState({
    shippingData: shipping || "",
    dateData: [
      dates[0] ? new Date(dates[0]) : currentDate,
      dates[1] ? new Date(dates[1]) : nextDate,
    ],
    addressData: address ? address : "",
    valueData: 0,
    nightsData: 1,
    checkboxData: false,
    checkbox2Data: false,
    priceData: 1,
    initialvalueData: 0,
  });


  useEffect(() => {
    if (shipping === "2") {
      setUserData((prevData) => ({
        ...prevData,
        initialvalueData: prevData.valueData + 1,
        valueData: prevData.valueData + 1,
      }));
    }
  }, [data]);

  useEffect(() => {
    findPrice();
  }, [userData.dateData]);

  const handleChange = () => {
    setUserData((prevData) => ({
      ...prevData,
      checkboxData: !prevData.checkboxData,
      valueData: prevData.checkboxData
        ? prevData.valueData - 1
        : prevData.valueData + 1,
    }));
  };

  const handleChangeTwo = () => {
    setUserData((prevData) => ({
      ...prevData,
      checkbox2Data: !prevData.checkbox2Data,
      valueData: prevData.checkbox2Data
        ? prevData.valueData - 2
        : prevData.valueData + 2,
    }));
  };

  const findPrice = () => {
    const durationInDays = Math.round(
      (userData.dateData[1] - userData.dateData[0]) / (1000 * 60 * 60 * 24)
    );
    let priceData = 1;
    let nightsData = 1;

    if (durationInDays < 0) {
      priceData = 1;
      nightsData = 1;
    } else if (durationInDays < 7) {
      priceData = durationInDays;
      nightsData = durationInDays;
    } else if (durationInDays >= 7 && durationInDays < 30) {
      priceData = Math.floor(durationInDays / 7) * 2 + 1;
      nightsData = durationInDays;
    } else {
      priceData = Math.floor(durationInDays / 30) * 7 + 1;
      nightsData = durationInDays;
    }

    setUserData((prevData) => ({ ...prevData, priceData, nightsData }));
  };

  const handlePickUp = (e) => {
    const selectedValue = parseInt(e.target.value);
    let newValueData = 0;
    if (selectedValue === 1 && userData.valueData > userData.initialvalueData) {
      newValueData = userData.valueData - 1;
    } else if (selectedValue === 2) {
      newValueData = userData.valueData + 1;
    }

    setUserData((prevData) => ({
      ...prevData,
      shippingData: selectedValue + "",
      valueData: newValueData,
    }));
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="product-container" onLoad={() => window.scrollTo(0, 0)}>
      <div className="head-section-for-product">
        <h2>Lorry trucks</h2>
      </div>
      <div className="body-section-for-product container">
        <div className="product-details-section">
          <img
            src="https://bitpastel.io/mi/rammoy/construction1/static/media/prod-img.4160137acd1ea284d8a2.webp"
            alt=""
          />

          <h1 className="c-vehicle-details__title">Water Truck 1</h1>

          <div>
            <h2 className="c-vehicle-details__subheader">Description</h2>
            <div className="heading-logo-section-container-for-slider">
              <img src={LogoLeftPart} alt="" />
              <img src={LogoRightPart} alt="" />
            </div>

            <h3 className="prod-para-heading-left">
              Best Yanmar powered hydraulic excavator for rent
            </h3>

            <p className="sixth-about">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium dolore mque laud antium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto be atae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni
              dolores.
            </p>

            <p className="sixth-about">
              Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam es
              qui dolorem ipsum quia dolor sit amet consectetur, adipisci velit
              sed quia non numquam eius modiy.
            </p>

            <div className="about-antek-equipments-rental-container-child-text-2">
              <ul className="sixth-about">
                <li>Nostrud exercitation ullamco laboris</li>
                <li>Ut aliquip ex ea reprehen deritin voluptate</li>
                <li>Adipisicing elit sed eiusmod tempor incididunt</li>
                <li>Labore dolore magna aliqua veniam nostrud</li>
              </ul>
            </div>

            <div>
              <h2 className="c-vehicle-details__subheader">Details</h2>
              <div className="heading-logo-section-container-for-slider">
                <img src={LogoLeftPart} alt="" />
                <img src={LogoRightPart} alt="" />
              </div>

              <table className="table table-hover table-striped custom-table">
                <tbody>
                  <tr className="common-pointer table-active-cell">
                    <td>Swing Speed Of Platform:</td>
                    <td>61km/h</td>
                  </tr>
                  <tr className="common-pointer table-active-cell">
                    <td>Maximum Hauling Force:</td>
                    <td>61km/h</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="payment-details-section">
          <div className="pricing-section">
            <div className="logo-and-price-section">
              <div className="heading-logo-section-container-for-slider">
                <img src={LogoLeftPart} alt="logo left part" />
                <img src={LogoRightPart} alt="logo right part" />
              </div>
              <p>${userData?.priceData}</p>
              <div className="heading-logo-section-container-for-slider">
                <img src={LogoLeftPart} alt="logo left part" />
                <img src={LogoRightPart} alt="logo right part" />
              </div>
            </div>
            <div className="ne-margin">
              <h2>NIGHTS: {userData?.nightsData} </h2>
            </div>
            <div>
              <div className="bottom-pricing-section">
                <p>$1/Day</p>
                <p>$2/Week</p>
                <p>$7/Month</p>
              </div>
            </div>
          </div>

          <div className="date-formate">
            <Calendar
              value={userData?.dateData}
              onChange={(e) =>
                setUserData({ ...userData, dateData: e.target.value })
              }
              selectionMode="range"
              hideOnRangeSelection
              className="common-pointer"
              minDate={new Date()}
              dateFormat="dd/mm/yy"
            />
            <img src={CalendarLogo} alt="" />
          </div>

          <div className="input-container-for-find-the-right-equipment-2 border-bottom-and-padding">
            <input
              type="radio"
              name="shipping"
              value="1"
              className="common-pointer"
              onChange={(e) => handlePickUp(e)}
              checked={userData?.shippingData === "1"}
            />{" "}
            Self-pickup
            <input
              type="radio"
              name="shipping"
              value="2"
              className="common-pointer"
              onChange={(e) => handlePickUp(e)}
              checked={userData?.shippingData === "2"}
            />{" "}
            Owner Delivery
          </div>

          <div className="where-to-deliver border-bottom-and-padding">
            <div className="common-input-in-where-to-deliver">
              <strong>
                Where:
                <select
                  name="addressData"
                  className="common-pointer common-input-in-where-to-deliver"
                  onChange={handleChanges}
                  value={userData.addressData}
                >
                  <option value="Levittown, New York 1">
                    Levittown, New York 1
                  </option>
                  <option value="Levittown, New York 2">
                    Levittown, New York 2
                  </option>
                  <option value="Levittown, New York 3">
                    Levittown, New York 3
                  </option>
                </select>
              </strong>
              <p>
                337 East Mayfair Ave., Levittown, NY1 <br />
                +419-792-2876
              </p>
            </div>
          </div>

          <div className="data-available ">
            <img src={TickLogo} alt="" />
            <p>Dates are available</p>
          </div>

          <div className="extra-options-section">
            <strong>Extra Options:</strong>
            <div className="price-and-checkbox">
              <div>
                <input
                  type="checkbox"
                  name=""
                  className="common-pointer"
                  onChange={handleChange}
                  checked={userData?.checkboxData}
                  id=""
                />{" "}
                Deposit (always include)1
              </div>
              <div className="price">
                <span>1$</span>
                <span>TOTAL</span>
              </div>
            </div>
            <div className="price-and-checkbox">
              <div>
                <input
                  type="checkbox"
                  name=""
                  className="common-pointer"
                  onChange={handleChangeTwo}
                  checked={userData?.checkbox2Data}
                  id=""
                />{" "}
                Deposit (always include)1
              </div>
              <div className="price">
                <span>2$</span>
                <span>TOTAL</span>
              </div>
            </div>
          </div>

          <div className="total-section border-bottom-and-padding ">
            <h2>Total:</h2>
            <p>${userData?.priceData + userData?.valueData}</p>
          </div>

          <button
            className="btn btn-primary mt-3 common-pointer book-now-btn"
            onClick={() =>
              navigate(
                `/checkout/${userData?.valueData + userData?.priceData + ".00"}`
              )
            }
          >
            Book Now
            <img src={RightArrow} alt="right arrow for button" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Product1;
