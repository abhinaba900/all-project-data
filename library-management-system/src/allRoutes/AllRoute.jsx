import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import ContentHolder from "../components/ContentHolder";
function AllRoute() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<ContentHolder />} />
        <Route
          path="*"
          element={
            <h1
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              Page Not Found
            </h1>
          }
        />
      </Routes>
    </div>
  );
}

export default AllRoute;
