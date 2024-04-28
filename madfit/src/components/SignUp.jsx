import React from "react";

import "../assets/css/SignUp.scss";
import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";
const SignUp = () => {
  const [active, setActive] = React.useState(false);
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
          <strong>STEP 1 - SIGN IN .</strong> STEP 2 - CONFIRM AND PAY
        </h3>
        <h1>Sign Up</h1>
        <p>
          It only takes a few steps to get{" "}
          <strong>
            instant access to everything the MadFit app has to offer.
          </strong>
        </p>
        <div className="sign-up-form" onClick={() => setActive(!active)}>
          <p>
            <img
              src="https://coral-app-akhln.ondigitalocean.app/static/media/footer-logo-madfit.8e20ac49fa501407e46ea904a6f00a5b.svg"
              alt="half image"
            />
            Continue with Madfit
          </p>
        </div>

        <div className="sign-up-forms">
          {active ? <SignInForm /> : <SignUpForm />}
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
};

export default SignUp;
