import React, { useEffect, useState } from "react";
import "./Css/GroupDetailsPage.scss";
import { AuthContext } from "../AuthContext/AuthContext";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import RiskMeter from "./RiskMeter";

// Rename the component to something descriptive
function GroupDetailsPage() {
  // Accessing context for group data
  const { allGroups, items, allData } = React.useContext(AuthContext);

  // Getting the groupId from URL params
  const { groupId } = useParams();

  // Finding the group and users belonging to the group
  const group = allGroups?.find((group) => group.id === groupId);
  const findUserId = items?.filter((item) => item.groupId === groupId);
  const findUser = findUserId?.map((item) =>
    allData?.find((data) => data.id === item.userId)
  );

  // Extracting media content associated with the group's users
  const media = findUserId?.map(
    (item) => allData?.find((data) => data.id === item.userId)?.media
  );

  // State for managing current index of media and lightbox state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [combinedMedia, setCombinedMedia] = useState([]);

  // Combine media arrays into a single array when data changes
  useEffect(() => {
    setCombinedMedia(media.flat());
  }, [allData]);

  // Function to render different media types
  const renderItem = (item, index) => {
    switch (item?.type) {
      case "image":
        return (
          <img
            style={{
              width: "auto",
              height: "180px",
              alignContent: "center",
              display: "block",
            }}
            key={index}
            src={item?.url}
            alt={`Image ${index}`}
            onClick={() => openLightbox(index)}
          />
        );
      case "pdf":
        return (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            style={{
              cursor: "pointer",
              width: "auto",
              height: "180px",
              alignContent: "center",
              display: "block",
            }}
          >
            <object
              key={index}
              data={item?.url}
              type="application/pdf"
              onClick={() => openLightbox(index)}
              style={{ display: "block" }}
            >
              <p>PDF could not be displayed</p>
            </object>
          </div>
        );
      case "video":
        return (
          <div
            style={{
              width: "auto",
              height: "180px",
              cursor: "pointer",
              display: "block",
              alignContent: "center",
            }}
            onClick={() => openLightbox(index)}
          >
            <ReactPlayer
              key={index}
              url={item?.url}
              controls
              width="auto"
              height="auto"
              onEnded={nextItem}
            />
          </div>
        );
      case "audio":
        return (
          <div
            key={index}
            onClick={() => openLightbox(index)}
            style={{
              cursor: "pointer",
              width: "auto",
              height: "180px",
              alignContent: "center",
            }}
          >
            <audio key={index} controls onClick={() => openLightbox(index)}>
              <source src={item?.url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      default:
        return null;
    }
  };

  // Function to open the lightbox with specific index
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setIsOpen(false);
  };

  // Function to move to the next item in the lightbox
  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % combinedMedia.length);
  };

  // Function to move to the previous item in the lightbox
  const prevItem = () => {
    setCurrentIndex(
      (currentIndex + combinedMedia.length - 1) % combinedMedia.length
    );
  };

  // Rendering the component
  return (
    <div
      style={{ backgroundColor: "#F0F8FF", height: "100%", padding: "1em" }}
      className=""
    >
      <div className="group-details-page-wrapper container">
        <div
          className="group-details-page"
          style={{
            padding: "1em",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            textAlign: "left",
          }}
        >
          <h1 style={{ fontWeight: "800" }}>{group?.name}</h1>
          <img
            style={{
              borderRadius: "50%",
              display: "block",
              margin: "auto",
              width: "50%",
            }}
            src={group?.image}
            alt={group?.name}
          />
          <h3>users in this group:</h3>
          {findUser?.map((user) => (
            <li key={user?.id} style={{ fontWeight: "800", color: "black" }}>
              {user?.name}
            </li>
          ))}
        </div>
        <div className="risk-details-page container">
          <RiskMeter riskScore={group?.risk_rate} />
        </div>
      </div>
      <div className="container">
        <h2 style={{ fontWeight: "800", textTransform: "uppercase" }}>
          Group Media
        </h2>
        <div className="gallery0">
          {combinedMedia.map((item, index) => renderItem(item, index))}
        </div>
        {isOpen && (
          <div className="lightbox">
            <button onClick={closeLightbox} className="close-btn">
              Close
            </button>
            {renderItem(combinedMedia[currentIndex], currentIndex)}
            <button onClick={prevItem} className="prev-btn">
              &#10094;
            </button>
            <button onClick={nextItem} className="next-btn">
              &#10095;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupDetailsPage;
