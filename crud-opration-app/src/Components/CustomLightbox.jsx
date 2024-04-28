import React, { useState } from "react";
import "./Css/CustomLightbox.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactPlayer from "react-player";
import { Button } from "@chakra-ui/react";
const CustomLightbox = ({ items, userResult }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const nextItem = () => {
    setCurrentIndex((currentIndex + 1) % items.length);
  };

  const prevItem = () => {
    setCurrentIndex((currentIndex + items.length - 1) % items.length);
  };

  const renderItem = (item, index) => {
    const { type, url, thumbnail } = item;
    switch (type) {
      case "image":
        return (
          <img
            key={index}
            src={thumbnail || url}
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
              height: "180px",
              alignContent: "center",
            }}
          >
            <object
              key={index}
              data={url}
              type="application/pdf"
              onClick={() => openLightbox(index)}
            >
              <p>PDF could not be displayed</p>
            </object>
          </div>
        );
      case "video":
        return (
          <div
            style={{
              height: "180px",
              cursor: "pointer",
              alignContent: "center",
            }}
            onClick={() => openLightbox(index)}
          >
            <ReactPlayer
              key={index}
              url={url}
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
              height: "180px",
              alignContent: "center",
            }}
          >
            <audio key={index} controls onClick={() => openLightbox(index)}>
              <source src={url} type="audio/mp3" />
              Your browser does not support the audio tag.
            </audio>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="gallery">
        {items.map((item, index) => renderItem(item?.media, index))}
      </div>
      {isOpen && (
        <div className="lightbox">
          <button onClick={closeLightbox} className="close-btn">
            Close
          </button>
          <button noOfLines={1} className="name-btn">
            {items[currentIndex]?.names}
          </button>
          {renderItem(items[currentIndex]?.media, currentIndex)}
          <button onClick={prevItem} className="prev-btn">
            &#10094;
          </button>
          <button onClick={nextItem} className="next-btn">
            &#10095;
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomLightbox;
