import React from "react";
import { Routes, Route, Switch } from "react-router-dom";
import HomePage from "../components/HomePage";
import Product1 from "../components/ProductPageComponents/Product1";
import Product2 from "../components/ProductPageComponents/Product2";
import PaypalPaymentIntigration from "../components/PaypalPaymentIntigration";
import CartPage from "../components/CartPadge";
import LoginPage from "../components/LoginPage";
function AllRoutes() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/product/1" exact element={<Product1 />} />
        <Route path="/product/1/:data" exact element={<Product1 />} />
        <Route path="/product/2" exact element={<Product2 />} />
        <Route path="/product/2/:data" exact element={<Product2 />} />
       
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login-SIGHUP" element={<LoginPage />} />
        <Route path="checkout/:id" element={<PaypalPaymentIntigration />} />
      </Routes>
    </div>
  );
}

export default AllRoutes;
