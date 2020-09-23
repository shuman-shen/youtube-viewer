/** @jsx jsx */

import { useState, useEffect } from "react";
import ResultList from "../components/ResultList";

const { jsx, Text, Box } = require("theme-ui");

const FavPage = () => {
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      setFavList(result);
    }
  }, []);

  return favList.length > 0 ? (
    <Box sx={{ textAlign: "center" }}>
      <ResultList allResults={favList} />
    </Box>
  ) : (
    <Box
      sx={{
        width: ["100vw", "80vw", "70vw", "40vw"],
        fontSize: "1.5rem",
        p: ["1.5rem", "1.5rem", "2rem", "4rem"],
        textAlign: "center",
      }}
    >
      <Text>No favourite video found.</Text>
    </Box>
  );
};

export default FavPage;
