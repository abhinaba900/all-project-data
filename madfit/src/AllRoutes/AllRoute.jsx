import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import SignUp from "../components/SignUp";
import TracerBiographies from "../components/TranerBiographies";
import PaypalPaymentIntigration from "../components/PaypalPaymentIntigration";
import AppFeature from "../components/AppFeature";
import MadFitPaymentPage from "../components/MadFitPaymentPage";
import OrderComplete from "../components/OrderComplete";
function AllRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trainer biographies" element={<TracerBiographies />} />
        <Route path="/app features" element={<AppFeature />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/payment/:data" element={<MadFitPaymentPage />} />
        <Route path="/payment-section" element={<PaypalPaymentIntigration />} />
        <Route path="/order-complete" element={<OrderComplete />} />


      </Routes>
    </div>
  );
}

export default AllRoute;
