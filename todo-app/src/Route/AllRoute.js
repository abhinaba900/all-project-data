import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import HomePage from "../Components/HomePage";
import Signup from "../Components/Signup";
import UpdateModle from "../Components/UpdateModle";
function AllRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default AllRoute;
