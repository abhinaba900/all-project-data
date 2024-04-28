import React, { useState, useRef, useEffect } from "react";

const ReadMoreLess = ({ text }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const textRef = useRef(null); // Create a ref for the text container
  const [visible, setVisible] = useState(false);

  const handleReadMoreClick = () => {
    setIsTruncated(false);
  };

  const handleReadLessClick = () => {
    setIsTruncated(true);
    if (textRef.current) {
      textRef.current.scrollIntoView({ behavior: "smooth" }); // Scrolls the text into view
    }
  };

  // Split the text into words and rejoin if it exceeds 50 words
  const resultString = isTruncated ? text.slice(0, 50) : text;
  useEffect(() => {
    if (text.length > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [text]);

  return (
    <div>
      <div ref={textRef} className={`content ${isTruncated ? "" : "expanded"}`}>
        <h2 className="text">{resultString}</h2>
      </div>
      {visible && (
        <button
          style={{ color: "blue", cursor: "pointer", fontSize: ".7em" }}
          onClick={isTruncated ? handleReadMoreClick : handleReadLessClick}
        >
          {isTruncated ? "Read More" : "Read Less"}
        </button>
      )}
    </div>
  );
};

export default ReadMoreLess;
