import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Components/Login";
import HomePage from "../Components/HomePage";
import Signup from "../Components/Signup";
import SingelUser from "../Components/SingelUser";
import GroupDetailsPage from "../Components/GroupDetailsPage";
function AllRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:id" element={<Signup />} />
        <Route path="/home/:userId" element={<SingelUser />} />
        <Route path="/group/:groupId" element={<GroupDetailsPage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default AllRoute;
