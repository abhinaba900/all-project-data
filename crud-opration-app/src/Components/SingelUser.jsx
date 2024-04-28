import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailLock, MdDescription } from "react-icons/md";
import "./Css/SingleUser.scss";
import { AuthContext } from "../AuthContext/AuthContext";

function SingleUser() {
  const { allData } = useContext(AuthContext);
  const { userId } = useParams();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = allData.find((user) => user.id === userId);
    fetch(`http://localhost:8080/description/${user?.dtil_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((datas) => {
        setData(datas);
      }).catch((error) => {
        console.error("Error:", error);
      })
  }, []);

  return (
    <>
      <h2 className="go-back" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Go Back
      </h2>
      <div
        style={{ backgroundImage: `url(${data?.image})` }}
        className="user-background-image"
      >
        <div className="user-details">
          <h3>Name: {data?.name}</h3>
          <p>
            Email:
            <MdOutlineMailLock />
            {data?.email}
          </p>
          <p>
            Phone:
            <FaPhoneAlt />
            {data?.phone}
          </p>
        </div>
      </div>
      <div className="user-description-container">
        <div className="user-description-header">
          <h2>
            <MdDescription /> Description
          </h2>
        </div>
        <div className="user-description-list">
          {data?.description?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </div>
      </div>
    </>
  );
}

export default SingleUser;
