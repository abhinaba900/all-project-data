import React, { useState, useEffect } from "react";

function Map() {
  return (
    <div className="map-container">
      <div className="map-frame">
        <iframe
          title="Google Map"
          className="google-map"
          src={`https://maps.google.com/maps?q=Levittown, New York1&t=&z=13&ie=UTF8&iwloc=&output=embed`}
        />
      </div>
    </div>
  );
}

export default Map;
