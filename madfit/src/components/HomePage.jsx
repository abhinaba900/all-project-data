import "../assets/css/HomePage.scss";
import Navbar from "./Navbar";
import circleTopLogo from "../assets/images/home/circle.svg";
import TargetCarausalDesktop from "./TargetCarausalDesktop";
import TrakingWithMobileImage from "./TrakingWithMobileImage";
import TargetCarausalMobile from "./TargetCarausalMobile";
import React from "react";
import { useNavigate } from "react-router-dom";
import CoustomSwiperForExpert from "./CoustomSwiperForExpert";
import HeadSection from "./HeadSection";
import FooterSection from "./FooterSection";
import TrakingWithMobileImageForMobile from "./TrakingWithMobileImageForMobile";
// Import Swiper React components

function HomePage() {
  const navigate = useNavigate();
  return (
    <div>
      <HeadSection />
      <div>
        <Navbar />
      </div>

      <div className="jump-into-section-2">
        <div className="jump-into-section container">
          <div className="jump-into-section-text-section">
            <h3>
              Jump into a <br /> healthier lifestyle
            </h3>
            <h2>TRY MADFIT FOR ONLY $1</h2>
            <p>
              Achieve your fitness goals with the MadFit app! Madfit offers a
              balanced approach to health and fitness that will leave you
              feeling your best!
            </p>
            <button className="common-btn" onClick={() => navigate("/sign-up")}>
              Start Now
            </button>
          </div>
          <div className="jump-into-section-image">
            <img
              className="jump-into-section-image-1"
              src={circleTopLogo}
              alt="main logo"
            />
            <img
              className="jump-into-section-image-2"
              src="https://coral-app-akhln.ondigitalocean.app/static/media/Nutrition.0d4d8c6d59966ae69fe7.png"
              alt="modern nutrition app"
            />
          </div>
        </div>
      </div>

      <div className="mobile-image-for-jump-into-section-2 container">
        <img
          src="https://coral-app-akhln.ondigitalocean.app/static/media/Nutrition.0d4d8c6d59966ae69fe7.png"
          alt="modern nutrition app"
        />
      </div>

      <div className="jump-into-section-text-section-2">
        <h3>Jump into a healthier lifestyle</h3>
        <h2>TRY MADFIT FOR ONLY $1</h2>
        <p>
          Achieve your fitness goals with the MadFit app! Madfit offers a
          balanced approach to health and fitness that will leave you feeling
          your best!
        </p>
        <button className="common-btn" onClick={() => navigate("/sign-up")}>
          Start Now
        </button>
      </div>

      <div className="target-body-and-mind-section container">
        <div className="target-body-text-section">
          <div>
            <h3>TARGET YOUR BODY & MIND</h3>
          </div>
          <div>
            <p>
              A growing collection of guided video workouts with styles ranging
              from high intensity strength training and cardio to slower-paced,
              mindfulness inspired workouts like yoga and pilates.{" "}
            </p>
          </div>
        </div>
        <button className="common-btn" onClick={() => navigate("/sign-up")}>
          Join Our Classes
        </button>
      </div>

      <div className="container">
        <TargetCarausalDesktop />
      </div>

      <div className="container">
        <TargetCarausalMobile />
      </div>
      <div className="container box-container">
        <img
          className="box-image"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
          alt=""
        />
        <div className="box-text-section">
          <h2>MEET OUR EXPERT TRAINERS</h2>
          <p>
            Get support, knowledge and encouragement from our team as Maddie and
            Arianna guide you through specially designed exercises, challenges
            and programs that will help you reach your goals.
          </p>
          <button
            className="common-btn"
            onClick={() => navigate("/App Features")}
          >
            Learn More
          </button>
        </div>
        <div className="box-image-and-text-section">
          <div>
            <img
              src="https://coral-app-akhln.ondigitalocean.app/static/media/expert1.a4a792fef6ce15070e54.jpg"
              alt=""
            />
            <h4>Maddie</h4>
            <p>
              MadFit founder and fitness expert. Maddie’s personal style is
              loved by over 10 million followers online.
            </p>
          </div>
          <div>
            <img
              src="https://coral-app-akhln.ondigitalocean.app/static/media/expert2.8706d36c243f425859b2.jpg"
              alt=""
            />
            <h4>Arianna</h4>
            <p>
              MadFit’s certified yoga instructor. Arianna brings moving and
              spiritual yoga to the MadFit library.
            </p>
          </div>
        </div>
      </div>

      <div className="meet-our-expert-trainers">
        <img
          className="box-image"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
          alt=""
        />
        <div className="box-text-section">
          <h2>MEET OUR EXPERT TRAINERS</h2>
          <p>
            Get support, knowledge and encouragement from our team as Maddie and
            Arianna guide you through specially designed exercises, challenges
            and programs that will help you reach your goals.
          </p>
          <button
            className="common-btn"
            onClick={() => navigate("/App Features")}
          >
            Learn More
          </button>
        </div>
        <div className="box-image-and-text-section">
          <CoustomSwiperForExpert />
        </div>
      </div>

      <div className="app-section container">
        <div className="app-image-section">
          <h2>A WORLD-CLASS APP</h2>
          <img
            onClick={() =>
              window.open(
                "https://apps.apple.com/us/app/madfit-home-fitness-workouts/id1577283718"
              )
            }
            className="app-image"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/app-store-new.27554b9aef9ac9189021f50e1016d7db.svg"
            alt=""
          />
        </div>
        <div className="app-text-section">
          <p>
            A custom-built, high-quality mobile app with a huge collection of
            features and tools to help you achieve your goals and stay focused
            on the most important areas of your fitness routine.
          </p>
          <button
            className="common-btn"
            onClick={() => navigate("/App Features")}
          >
            Learn More
          </button>
        </div>
      </div>

      <div className="container">
        <TrakingWithMobileImage />
      </div>

      <div className="container">
        <TrakingWithMobileImageForMobile />
      </div>

      <div className="container parent-container-for-our-community">
        <img
          className="circle-image-logo"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/circle.1b669e34b20ea554f7806b56d00b5cdf.svg"
          alt=""
        />
        <div className="container text-section">
          <h2>OUR COMMUNITY AND THEIR ACHIEVEMENTS</h2>
          <p>
            MadFit has helped thousands of users get the results they were
            looking for. From building strength and mobility to hitting a
            weight-loss or weight-gain target, we love to celebrate our
            community’s personal victories.
          </p>
          <div className="star-section-container">
            <div className="star-section">
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
            </div>
            <h4>“THIS APP IS AMAZING”</h4>
            <p>
              'My experience with this app is amazing, I learned to workout and
              appreciate my body and all my efforts.'
            </p>
          </div>
          <div className="star-section-container">
            <div className="star-section">
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
              <img src="https://www.svgrepo.com/show/13674/star.svg" alt="" />
            </div>
            <h4>“THE DIVERSITY OF EXERCISES IS AMAZING!”</h4>
            <p>
              'I feel challenged no matter what exercises I do and it gives me
              results. I love how it works with my time and space at home.'
            </p>
          </div>
          <button className="common-btn" onClick={() => navigate("/Sign-Up")}>
            Join Our Community
          </button>
        </div>
      </div>

      <div className="container promotion-section-parent">
        <div className="text-section">
          <div className="text-section-container">
            <h4>1 month</h4>
            <h2>TRY MADFIT FOR ONLY</h2>
            <h1>$1.00</h1>
            <p>For the first month*</p>
          </div>
        </div>
        <div className="image-section">
          <img
            className="half-logo-madfit"
            src="https://coral-app-akhln.ondigitalocean.app/static/media/footer-logo-madfit.8e20ac49fa501407e46ea904a6f00a5b.svg"
            alt=""
          />
          <h2>TRY MADFIT TODAY</h2>
          <p>
            Take advantage of this limited deal today and try MadFit out for a
            whole <br /> month for a single dollar.
          </p>
          <p>
            No commitment to any extra subscriptions. <br /> Try it out today
            and cancel at any time during the first month.
          </p>
          <button className="common-btn" onClick={() => navigate("/Sign-Up")}>
            Start Now
          </button>
        </div>
      </div>

      

      <FooterSection />
    </div>
  );
}

export default HomePage;
