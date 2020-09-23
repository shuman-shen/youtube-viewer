/** @jsx jsx */
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { jsx, Flex } from "theme-ui";
import Player from "../components/Player";

const PlayerPage = ({ match: { params }, location }) => {
  const { videoId } = params;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      const found = result.find((item) => item.id.videoId === videoId);
      if (found) {
        setFav(true);
      }
    } else {
      const initialArray = [];
      window.localStorage.setItem("ytbFav", JSON.stringify(initialArray));
    }
  }, [videoId]);

  const handleClick = () => {
    const {
      state: { item },
    } = location;

    const result = window.localStorage.getItem("ytbFav");
    let toArray = [];
    let found = false;
    if (result) {
      toArray = JSON.parse(result);
      found = toArray.find((item) => item.id.videoId === videoId);
    }

    if (!fav && !found) {
      toArray.push(item);
      const arrayStr = JSON.stringify(toArray);
      window.localStorage.setItem("ytbFav", arrayStr);
      setFav(true);
    } else if (!fav && found) {
      setFav(true);
    } else if (fav && found) {
      const newArray = toArray.filter((item) => item.id.videoId !== videoId);
      window.localStorage.setItem("ytbFav", JSON.stringify(newArray));
      setFav(false);
    } else {
      setFav(false);
    }
  };

  if (location["state"] !== undefined) {
    return (
      <Flex sx={{ width: "100vw", justifyContent: "center" }}>
        <Player item={location.state.item} fav={fav} onClick={handleClick} />
      </Flex>
    );
  } else {
    return <Redirect to="/notfound" />;
  }
};

export default PlayerPage;
