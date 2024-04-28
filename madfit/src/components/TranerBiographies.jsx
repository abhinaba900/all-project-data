import React from "react";
import "../assets/css/TranerBiographies.scss";
import Navbar from "./Navbar";
import HeadSection from "./HeadSection";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import FooterSection from "./FooterSection";
import { useNavigate } from "react-router-dom";
function TracerBiographies() {
    const navigate = useNavigate();
  return (
    <div className="Tracer-Biographies">
      <HeadSection />
      <Navbar />
      <div className="Tracer-Biographies-container">
        <img
          className="circle-image-logo"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
          alt="cercle-image-logo"
        />
        <div className="Tracer-Biographies-text">
          <h2>
            MADDIE LYMBURNER |{" "}
            <span>
              <FaTiktok
                className="header-icon"
                onClick={() => window.open("https://www.tiktok.com/@mad_fit")}
              />

              <FaInstagram
                className="header-icon"
                onClick={() =>
                  window.open("https://www.instagram.com/madfit.ig/")
                }
              />
            </span>
          </h2>

          <p>
            Helping people feel empowered and making fitness accessible to
            everyone is what Maddie Lymburner is most passionate about. Starting
            her Youtube channel in 2018, Maddie’s approach to a welcoming and
            positive fitness routine gained more than a million followers in
            only a year.
          </p>

          <p>
            During the Covid-19 Pandemic when so many people were stuck indoors,
            millions more turned to Maddie to help stay fit, active and
            encouraged with all the varied exercises and feel-good dance party
            workouts the MadFit channel offered. The community that Maddie
            helped grow through these difficult times earned her an award from
            Google as one of the top Canadian Youtubers of 2021.
          </p>

          <p>
            The MadFit story didn’t stop there, as Maddie created the MadFit App
            with a huge selection of new workouts and programs to help everyone
            achieve their goals. An instant success, MadFit earned the App Of
            The Day award on the Apple App Store. Since then, the MadFit App has
            kept growing and branching out into new ways to stay happy and
            healthy.
          </p>

          <button className="common-btn" onClick={() => navigate("/sign-up")}>
            Join Maddie in the Madfit App
          </button>
        </div>
        <div className="Tracer-Biographies-image">
          <img
            src="https://coral-app-akhln.ondigitalocean.app/static/media/Rectangle-3.f16f1aa8c0e94fc0e07d.png"
            alt="sub image"
          />
        </div>
      </div>
      <div className="Tracer-Biographies-container-2">
        <img
          className="circle-image-logo-2"
          src="https://coral-app-akhln.ondigitalocean.app/static/media/full-circle2.4d0e9e95bf2d1f59fe43.png"
          alt="cercle-image-logo"
        />
        <div className="Tracer-Biographies-image">
          <img
            src="https://coral-app-akhln.ondigitalocean.app/static/media/Rectangle-2.ad7097486266c546955d.png"
            alt="sub image"
          />
        </div>
        <div className="Tracer-Biographies-text">
          <h2>
            ARIANNA ELIZABETH |{" "}
            <span>
              <FaInstagram
                className="header-icon"
                onClick={() =>
                  window.open("https://www.instagram.com/brightxsaltedyoga/")
                }
              />
            </span>
          </h2>

          <p>
            Arianna is a certified and experienced yoga instructor who has been
            helping bring the joys and appreciation of yoga to people’s lives
            for more than 8 years. Teaching at her own Yoga Studio or making her
            classes accessible to everyone on her YouTube channel, hundreds of
            thousands of people join Arianna to help find awareness and
            intention in their movements with yoga.
          </p>

          <p>
            A safe and welcoming space for all is what Arianna strives for -
            giving everyone a chance to respect the vast benefits of yoga whilst
            reflecting on their own personal beliefs. Ariana crafts her classes
            to offer asanas that build functional, intrinsic strength that can
            be used in people’s daily lives.
          </p>

          <p>
            Arianna joined Maddie in the MadFit family to help bring all the
            benefits yoga can offer to the thousands of subscribers that already
            enjoy Maddie’s classes, adding a new reflective and spiritual
            direction to the community.
          </p>

          <button className="common-btn" onClick={() => navigate("/sign-up")}>
            Join Maddie in the Madfit App
          </button>
        </div>
      </div>
      <FooterSection />
    </div>
  );
}

export default TracerBiographies;
