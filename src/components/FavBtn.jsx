import React from "react";
import { ReactComponent as FavIcon } from "../asset/heart.svg";
import { ReactComponent as FavSolidIcon } from "../asset/heart-solid.svg";

const FavBtn = ({ onClick, fav }) => {
  return (
    <div onClick={onClick}>
      {fav ? (
        <FavSolidIcon sx={{ fill: "red", height: "2rem", width: "2rem" }} />
      ) : (
        <FavIcon sx={{ fill: "red", height: "2rem", width: "2rem" }} />
      )}
    </div>
  );
};

const iconStyle = {
  fill: "primary",
  width: "2rem",
  height: "2rem",
  cursor: "pointer",
};

export default FavBtn;
