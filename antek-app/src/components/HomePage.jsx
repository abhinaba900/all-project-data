import React, { useRef } from "react";
import AboveHeadSection from "./homePageComponents/AboveHeadSection";
import "./css/HomePage.css";
import NavbarForHomePage from "./homePageComponents/NavbarForHomePage";
import ImageAndTextSlider from "./homePageComponents/ImageAndTextSlider";
import FindTheRightEquipment from "./homePageComponents/FindTheRightEquipment";
import BrowseMachineryCategories from "./homePageComponents/BrowseMachineryCategories";
import AboutAntekEquipmentsRental from "./homePageComponents/AboutAntekEquipmentsRental";
import AboutAntekEquipmentsRentalBottomSection from "./homePageComponents/AboutAntekEquipmentsRentalBottomSection";
import CustomersThoughts from "./homePageComponents/CustomersThoughts";
import Footer from "./homePageComponents/Footer";
import Map from "./Map";
import MobileNavbar from "./MobileNavbar";
function HomePage() {
  

  
  return (
    <div>
      <AboveHeadSection />
      <MobileNavbar />
      <NavbarForHomePage />
      <ImageAndTextSlider />
      <FindTheRightEquipment />
      <BrowseMachineryCategories />
      <AboutAntekEquipmentsRental />
      <Map />
      <AboutAntekEquipmentsRentalBottomSection />
      <CustomersThoughts />
      <Footer />
    </div>
  );
}

export default HomePage;
