import React from "react";
import { Link } from "react-router-dom";
import PaypalPaymentIntigration from "./PaypalPaymentIntigration";
import { useParams } from "react-router-dom";
function MadFitPaymentPage() {
  const { data } = useParams();
  console.log(data);

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

      <img
        onClick={() => window.history.back()}
        className="image-cercle-3"
        src="https://coral-app-akhln.ondigitalocean.app/static/media/arrow-back_1.f57a211390927dd07ac1846e511bd9c8.svg"
        alt="button image"
      />

      <div className="sign-up-img-container container">
        <img
          className="sign-up-img"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/Horizontal-Logo-Dark.2d69093a91578f69f010df30e3d8d198.svg"
          alt=""
        />
      </div>
      <div className="sign-up-form-container">
        <h3>
          STEP 1 - SIGN IN . <strong>STEP 2 - CONFIRM AND PAY</strong>
        </h3>
        <h1>CONFIRM AND PAY</h1>

        <div className="madfit-membership-payment-section">
          <img
            src="https://coral-app-akhln.ondigitalocean.app/static/media/Horizontal-Logo-Dark.2d69093a91578f69f010df30e3d8d198.svg"
            alt=""
          />
          <p>
            Madfit 1 Month Membership <span className="not-price">$19.99</span>
          </p>
          <p>
            Madfit Membership Special <span>$1.00</span>
          </p>
          <p>
            Offer <span className="save-price">SAVE 95%</span>
          </p>
          <hr />
          <p>
            Total Due Today <span>$1.00</span>
          </p>
        </div>

        <div className="input-box">
          <input type="text" value={JSON.parse(data)} />
        </div>

        <div className="payment-page">
          <PaypalPaymentIntigration />
        </div>

        <div className="terms-and-conditions">
          <p>
            This offer is for new customers only. By signing up, you agree to
            our <strong>Terms and conditions.</strong> You will be billed $1.00
            USD immediately and will be charged $19.99 USD to the same payment
            details unless you unsubscribe.
          </p>
          <p>
            You may unsubscribe from membership at any time and will not be
            required to pay anything further.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MadFitPaymentPage;
