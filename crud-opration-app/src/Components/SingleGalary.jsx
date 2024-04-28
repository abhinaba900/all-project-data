import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import "./Css/CustomLightbox.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ReactPlayer from "react-player";
import { FaRegFilePdf } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

function SingleGallery({ id, itemsOfGroup, role }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { allData } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (role === "group") {
      setItems(itemsOfGroup);
    } else {
      const data = allData.find((item) => item.id === id);
      const media = data?.media || [];
      setItems(media);
    }

    // const temp = media.map((url) => {
    //   const extension = url.split(".").pop().toLowerCase();
    //   const mimeType = url.split(";")[0].split(":")[1];
    //   const youtubeVideoId = url.includes("youtube.com")
    //     ? url.split("v=")[1]
    //     : null;

    //   if (extension === "pdf") {
    //     return "pdf";
    //   } else if (
    //     extension === "mp4" ||
    //     extension === "avi" ||
    //     extension === "mov" ||
    //     youtubeVideoId
    //   ) {
    //     return "video";
    //   } else if (
    //     extension === "jpg" ||
    //     extension === "jpeg" ||
    //     extension === "png" ||
    //     extension === "gif" ||
    //     mimeType === "image/jpeg" ||
    //     mimeType === "image/png" ||
    //     mimeType === "image/gif"
    //   ) {
    //     return "image";
    //   } else if (
    //     extension === "mp3" ||
    //     extension === "wav" ||
    //     extension === "ogg"
    //   ) {
    //     return "audio";
    //   } else {
    //     return "unknown";
    //   }
    // });

    // const itemObjects = media.map((url, index) => ({ type: temp[index], url }));
  }, [allData, id]);

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
    switch (item?.type) {
      case "image":
        return (
          <img
            key={index}
            src={item?.url}
            alt={`Image ${index}`}
            onClick={() => openLightbox(index)}
            style={{ margin: "auto", display: "block" }}
          />
        );
      case "pdf":
        return (
          <embed
            style={{ margin: "auto", display: "block" }}
            key={index}
            src={item?.url}
            type="application/pdf"
            width="100%"
          />
        );
      case "video":
        return (
          <ReactPlayer
            key={index}
            url={item?.url}
            controls
            width="100%"
            height="auto"
            onEnded={nextItem}
            onClick={() => openLightbox(index)}
          />
        );
      case "audio":
        return (
          <audio key={index} controls onClick={() => openLightbox(index)}>
            <source src={item?.url} type="audio/mp3" />
            Your browser does not support the audio tag.
          </audio>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="gallery">
        {(items[0]?.type === "image" && (
          <div>
            <img
              style={{
                width: "30%",
                borderRadius: "50%",
                objectFit: "contain",
                display: "block",
                margin: "auto",
              }}
              onClick={() => openLightbox(0)}
              src={items[0]?.url}
              alt="Gallery"
            />
            +{items.length - 1}
          </div>
        )) ||
          (items[0]?.type === "pdf" && (
            <div>
              <FaRegFilePdf
                fontSize={"4em"}
                color="red"
                onClick={() => openLightbox(0)}
              />
              +{items.length - 1}
            </div>
          ))}
      </div>
      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeLightbox}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Media Viewer</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{renderItem(items[currentIndex], currentIndex)}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={prevItem}>
              Previous
            </Button>
            <Button colorScheme="blue" mr={3} onClick={nextItem}>
              Next
            </Button>
            <Button onClick={closeLightbox}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default SingleGallery;
