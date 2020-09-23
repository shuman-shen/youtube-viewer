/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, Box, Text } from "theme-ui";
import ResultList from "../components/ResultList";

const FavPage = () => {
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      setFavList(result);
    }
  }, []);

  return favList.length > 0 ? (
    <ResultList allResults={favList} />
  ) : (
    <Box sx={textStyle}>
      <Text>No favourite video found.</Text>
    </Box>
  );
};

const textStyle = {
  fontSize: "1.5rem",
  p: ["1.5rem", "1.5rem", "2rem", "4rem"],
  textAlign: "center",
  width: ["100vw", "80vw", "70vw", "40vw"],
};

export default FavPage;
