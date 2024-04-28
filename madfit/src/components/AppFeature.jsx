import React from "react";
import HeadSection from "./HeadSection";
import Navbar from "./Navbar";
import FooterSection from "./FooterSection";
import "../assets/css/AppFeature.scss";
import { useNavigate } from "react-router-dom";

function AppFeature() {
  const navigate = useNavigate();

     

  return (
    <div onLoad={() => window.scrollTo(0, 0)}>
      <HeadSection />
      <Navbar />
      <div className="app-feature-container-parent-2">
        <div className="app-feature-container-parent container">
          <div className="app-feature-text-container container">
            <div className="app-feature-image">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/terget2.fc33aa5b4cf87cb59a9d.jpg"
                alt="top image"
              />
            </div>
            <div className="app-feature-text">
              <h2>CHALLENGES</h2>
              <p>
                Push yourself with our custom challenge programs built from the
                ground up to help you stay encouraged and target specific
                fitness goals.
              </p>
              <p>
                Our challenges are more than just a set of exercises - they are
                built with a focus on the series as a whole, featuring exercises
                that grow and complement each other and set days for rest and
                reflection.
              </p>
            </div>
          </div>
          <div className="app-feature-text-container-2">
            <div className="app-feature-text-2">
              <h2>IN THE APP</h2>
              <p>
                Choose from challenges like the 21 Day Move Challenge,
                Mindfulness Challenge and more. Let the MadFit app automatically
                fill out your calendar with a structured routine including rest
                and reflection days.
              </p>
              <button
                className="common-btn"
                onClick={() => navigate("/sign-up")}
              >
                Start Now
              </button>
            </div>
            <div className="app-feature-image-2">
             
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/challenges_feature.c19d4bcbb6d27920352d.png"
                alt="mobile image"
              />
            </div>
          </div>
        </div>
        <div className="app-feature-container-parent container">
          <div className="app-feature-text-container container">
            <div className="app-feature-text">
              <h2>YOGA</h2>
              <p>
                Slow down and unwind with our professional yoga classes hosted
                by MadFit’s own qualified yoga instructor, Arianna. With a large
                selection of different approaches to more relaxing workouts,
                MadFit is ready for when you want to look inward and take your
                exercise routine a little slower.
              </p>
            </div>
            <div className="app-feature-image">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/terget1.d1f38555779abb835dac.jpg"
                alt="top image"
              />
            </div>
          </div>
          <div className="app-feature-text-container-2">
            <div className="app-feature-image-2">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/yoga_feature.9f65fa9501705cb3b7e1.png"
                alt="mobile image"
              />
            </div>
            <div className="app-feature-text-2">
              <h2>IN THE APP</h2>
              <p>
                Choose from challenges like the 21 Day Move Challenge,
                Mindfulness Challenge and more. Let the MadFit app automatically
                fill out your calendar with a structured routine including rest
                and reflection days.
              </p>
              <button
                className="common-btn"
                onClick={() => navigate("/sign-up")}
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
        <div className="app-feature-container-parent container">
          <div className="app-feature-text-container container">
            <div className="app-feature-image">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/Mindfulness.18bd8cbe290cc04b284b.png"
                alt="top image"
              />
            </div>
            <div className="app-feature-text">
              <h2>MINDFULNESS</h2>
              <p>
                MadFit doesn’t just focus on your physical health - mental
                health is just as important! To help support your journey in
                fitness, MadFit offers reflective and meditative classes
                alongside app features that help you look inward.
              </p>
            </div>
          </div>
          <div className="app-feature-text-container-2">
            <div className="app-feature-text-2">
              <h2>IN THE APP</h2>
              <p>
                A selection of classes that start with beginners entirely new to
                the world of yoga, to longer and more advanced flows. Enjoy
                challenges that mix yoga into your weekly exercise routine.
              </p>
              <button
                className="common-btn"
                onClick={() => navigate("/sign-up")}
              >
                Start Now
              </button>
            </div>
            <div className="app-feature-image-2">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/Mindfulness_feature.b7fcf89319f0594cf4c0.png   "
                alt="mobile image"
              />
            </div>
          </div>
        </div>
        <div className="app-feature-container-parent container">
          <div className="app-feature-text-container container">
            <div className="app-feature-text">
              <h2>VIDEO CLASSES</h2>
              <p>
                Choose from a huge library of video classes to guide you through
                a wide range of different exercises and routines. MadFit offers
                strength and flexibility training that targets different areas
                of the body alongside pilates, endurance and yoga classes. With
                our real-time workouts, you can follow along with your
                instructor throughout an extended fitness session like a live
                fitness class.
              </p>
            </div>
            <div className="app-feature-image">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/video_classes.016863e53e3b04ef388f.png"
                alt="top image"
              />
            </div>
          </div>
          <div className="app-feature-text-container-2">
            <div className="app-feature-image-2">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/video_classes_feature.590282f5ad2db66610b2.png"
                alt="mobile image"
              />
            </div>
            <div className="app-feature-text-2">
              <h2>IN THE APP</h2>
              <p>
                Hours of video content from our expert trainers with individual
                exercises, real time classes, programs and challenges to choose
                from.
              </p>
              <button
                className="common-btn"
                onClick={() => navigate("/sign-up")}
              >
                Start Now
              </button>
            </div>
          </div>
        </div>
        <div className="app-feature-container-parent container">
          <div className="app-feature-text-container container">
            <div className="app-feature-image">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/Nutrition.0d4d8c6d59966ae69fe7.png"
                alt="top image"
              />
            </div>
            <div className="app-feature-text">
              <h2>NUTRITION</h2>
              <p>
                With a healthy diet, you’re fueling your body to build muscles,
                burn calories and get the most out of your workouts. MadFit
                offers more than one hundred recipes for all meals of the day
                plus snacks and drinks. Written by our team of nutritionists,
                our tasty and fueling recipes will keep your energy levels up
                and ready for your next workout.
              </p>
            </div>
          </div>
          <div className="app-feature-text-container-2">
            <div className="app-feature-text-2">
              <h2>IN THE APP</h2>
              <p>
                Search through our massive library of recipes with filters for
                diet type and mealtime. Updated often with new dishes from our
                team.
              </p>
              <button
                className="common-btn"
                onClick={() => navigate("/sign-up")}
              >
                Start Now
              </button>
            </div>
            <div className="app-feature-image-2">
              <img
                src="https://coral-app-akhln.ondigitalocean.app/static/media/nutrition_feature.b7f3ed2c998b618b6746.png"
                alt="mobile image"
              />
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default AppFeature;
