import React from "react";
import { Link } from "react-router-dom";
import {
  FaTiktok,
  FaInstagramSquare,
  FaYoutube,
  FaFacebook,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function OrderComplete() {
  const navigate = useNavigate();
  return (
    <div className="sign-up-container ">
      <img
        className="image-cercle"
        src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
        alt=""
      />
      <img
        className="image-cercle-2"
        src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
        alt=""
      />

      <div className="sign-up-img-container container">
        <img
          className="sign-up-img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/Horizontal-Logo-Dark.2d69093a91578f69f010df30e3d8d198.svg"
          alt=""
        />
      </div>
      <div className="sign-up-form-container">
        <h1>ORDER COMPLETE!</h1>
        <h6>Thank you so much for joining MadFit!</h6>
        <p>
          We hope you enjoy your first month with us - check out our recipes,
          find your favourite workouts in the exercies library and don't forget
          to sign up to one of the exciting challenges!
        </p>
        <p>
          Follow us on social media to keep up to date with all the community
          buzz and content MadFit offers!
        </p>
        <div className="icon-container">
          <FaTiktok
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo(0, 0)}
          />
          <FaInstagramSquare
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo(0, 0)}
          />
          <FaYoutube
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo(0, 0)}
          />
          <FaFacebook
            style={{ cursor: "pointer" }}
            onClick={() => window.scrollTo(0, 0)}
          />
        </div>

        <p>
          If you haven’t yet downloaded the app, get it on your platform of
          choice here.
        </p>

        <div className="all-store">
          <img
            src="data:image/png;base64,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"
            alt="apple store logo"
            onClick={() =>
              window.open(
                "https://apps.apple.com/us/app/madfit-home-fitness-workouts/id1577283718"
              )
            }
          />

          <img
            src="data:image/png;base64,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"
            alt="play store logo"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=nz.co.madfit"
              )
            }
          />
        </div>

        <p>
          Just log in with your email and password you created or sign in with
          your social account.
        </p>
        <p>We are so glad to have you with us</p>
        <strong>Let’s work together to reach our personal goals!</strong>

        <button className="common-btn" onClick={() => navigate("/")}>
          Let’s Get Started
        </button>
      </div>
    </div>
  );
}

export default OrderComplete;
