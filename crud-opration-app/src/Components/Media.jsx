import React, { useEffect, useState } from "react";
import CustomLightbox from "./CustomLightbox";
import { AuthContext } from "../AuthContext/AuthContext";

const Media = () => {
  const { allData } = React.useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [userResult, setUserResult] = useState([]);

  useEffect(() => {
    const mediaData = allData.map((data) => data.media);
    const findUser = allData.map((data) => data.name);
    const userAccordingToMedia = allData.map((data, index) => {
      return data.media.map((media) => ({
        media,
        names: findUser[index],
      }));
    });

    const media = mediaData.flat();
    const find = findUser.flat();

    setItems(userAccordingToMedia.flat());
    setUserResult(find);
  }, [allData]);

  return (
    <div>
      <h1>Media Gallery</h1>
      <CustomLightbox items={items} userResult={userResult} />
    </div>
  );
};

export default Media;
