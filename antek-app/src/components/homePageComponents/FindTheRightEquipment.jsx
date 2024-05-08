import React from "react";
import {
  LeftWhiteLogo,
  RightWhiteLogo,
  ShippingLogo,
  LocationLogo,
  CalendarLogo,
  RightArrow,
} from "../../assets";
import { Calendar } from "primereact/calendar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";

import { useNavigate } from "react-router-dom";
function FindTheRightEquipment() {
  const currentDate = new Date();
  const navigate = useNavigate();
  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const [data, setData] = React.useState({
    truck: "",
    address: "",
    dates: [currentDate, nextDate],
    shipping: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert dates to ISO 8601 format
    const formattedData = {
      ...data
    };

    if (data?.truck === "Water Track 1") {
      navigate(`/product/1/${JSON.stringify(formattedData)}`);
    } else if (data?.truck === "Water Track 2") {
      navigate(`/product/2/${JSON.stringify(formattedData)}`);
    }
  };

  console.log(data.dates);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="inner-filter container" id="QuickOrder">
      <div className="heading-logo-section-container-for-slider">
        <img src={LeftWhiteLogo} alt="logo left part" />
        <img src={RightWhiteLogo} alt="logo right part" />
      </div>
      <h3>Find The Right Equipment</h3>
      <form onSubmit={handleSubmit}>
        <div className="main-container-for-input-for-find-the-right-equipment">
          <div className="input-container-for-find-the-right-equipment">
            <img src={ShippingLogo} alt="" />
            <label>
              <select
                name="truck"
                className="common-pointer"
                required
                onChange={handleChange}
              >
                <option value="">Select Category</option>
                <option value="Water Track 1">Water Track 1</option>
                <option value="Water Track 2">Water Track 2</option>
              </select>
            </label>
          </div>

          <div className="input-container-for-find-the-right-equipment">
            <img src={LocationLogo} alt="" />
            <select
              name="address"
              className="common-pointer"
              onChange={handleChange}
              required
            >
              <option value="">Select Location</option>
              <option value="Levittown, New York 1">Levittown, New York 1</option>
              <option value="Levittown, New York 2">Levittown, New York 2</option>
              <option value="Levittown, New York 3">Levittown, New York 3</option>
            </select>
          </div>
          <div className="input-container-for-find-the-right-equipment">
            <img src={CalendarLogo} alt="" />
            <Calendar
              name="dates"
              value={data?.dates}
              onChange={handleChange}
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
              className="common-pointer"
              dateFormat="dd/mm/yy"
              minDate={new Date()}
            />
          </div>
        </div>
        <div className="main-container-for-input-for-find-the-right-equipment">
          <div className="input-container-for-find-the-right-equipment-2">
            <input
              type="radio"
              value="1"
              name="shipping"
              className="common-pointer"
              onChange={handleChange}
            />{" "}
            Self-pickup
            <input
              type="radio"
              name="shipping"
              value="2"
              className="common-pointer"
              onChange={handleChange}
            />{" "}
            Owner Delivery
          </div>
          <Button className="btn btn-primary mt-3 common-pointer" type="submit">
            find my rentals{" "}
            <img src={RightArrow} alt="right arrow for button" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default FindTheRightEquipment;
