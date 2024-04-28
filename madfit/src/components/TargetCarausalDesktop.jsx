import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

import CercleImage from "../assets/images/home/circle.svg"; // Import your CercleImage

const CarouselComponent = () => {
  return (
    <div className="target-carausal-desktop-container">
      <div className="sub-main-container odd">
        <div className="target-row">
          <img
            className="cercle-image-logo"
            src={CercleImage}
            alt="cercle-image-logo"
          />
          <img
            className="cercle-image-logo-2"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
            alt="cercle-image-logo-2"
          />
          <h2>CHALLENGES</h2>
          <p>Carefully crafted challenges to target your personal goals.</p>
          <Link to="/App Features" className="learn-more-link">
            Learn More
          </Link>
        </div>
        <img
          className="terget1img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/terget2.fc33aa5b4cf87cb59a9d.jpg"
          alt="Main Image"
        />
      </div>
      <div className="sub-main-container even">
        <div className="target-row">
          <img
            className="cercle-image-logo"
            src={CercleImage}
            alt="cercle-image-logo"
          />
          <img
            className="cercle-image-logo-2"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
            alt="cercle-image-logo-2"
          />
          <h2>YOGA</h2>
          <p>A selection of various yoga routines to relax & inspire.</p>
          <Link to="/App Features" className="learn-more-link">
            Learn More
          </Link>
        </div>
        <img
          className="terget1img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/terget1.d1f38555779abb835dac.jpg"
          alt="Main Image"
        />
      </div>
      <div className="sub-main-container odd">
        <div className="target-row">
          <img
            className="cercle-image-logo"
            src={CercleImage}
            alt="cercle-image-logo"
          />
          <img
            className="cercle-image-logo-2"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
            alt="cercle-image-logo-2"
          />
          <h2>MINDFULNESS</h2>
          <p>
            Build healthy habits for your mental health as part of your routine.
          </p>
          <Link to="/App Features" className="learn-more-link">
            Learn More
          </Link>
        </div>
        <img
          className="terget1img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/Mindfulness.18bd8cbe290cc04b284b.png"
          alt="Main Image"
        />
      </div>
      <div className="sub-main-container even">
        <div className="target-row">
          <img
            className="cercle-image-logo"
            src={CercleImage}
            alt="cercle-image-logo"
          />
          <img
            className="cercle-image-logo-2"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
            alt="cercle-image-logo-2"
          />
          <h2>VIDEO CLASSES</h2>
          <p>
            A huge collection of guided exercises for you to choose at your
            pace.
          </p>
          <Link to="/App Features" className="learn-more-link">
            Learn More
          </Link>
        </div>
        <img
          className="terget1img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/video_classes.016863e53e3b04ef388f.png"
          alt="Main Image"
        />
      </div>
      <div className="sub-main-container odd">
        <div className="target-row">
          <img
            className="cercle-image-logo"
            src={CercleImage}
            alt="cercle-image-logo"
          />
          <img
            className="cercle-image-logo-2"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
            alt="cercle-image-logo-2"
          />
          <h2>NUTRITION</h2>
          <p>Fuel your body the right way with our recipes for every meal.</p>
          <Link to="/App Features" className="learn-more-link">
            Learn More
          </Link>
        </div>
        <img
          className="terget1img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/Nutrition.0d4d8c6d59966ae69fe7.png"
          alt="Main Image"
        />
      </div>
    </div>
  );
};

export default CarouselComponent;
