/** @jsx jsx */
import { jsx, Box, Text } from "theme-ui";
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import searchApi from "../api/search";
import EndlessList from "../components/EndlessList";
import { toast, ToastContainer } from "react-toastify";

const ResultPage = ({ location }) => {
  const [allResults, setAllResults] = useState([]);
  const [nextToken, setNextToken] = useState();

  useEffect(() => {
    if (location["state"] !== undefined) {
      setAllResults(location.state.results);
      setNextToken(location.state.pageToken);
    }
  }, [location]);

  const getMoreResults = async () => {
    if (location["state"] !== undefined) {
      const { state } = location;

      if (state["pageToken"] === undefined) {
        return;
      }

      let searchData = {
        q: state.query,
        pageToken: nextToken,
      };
      const res = await searchApi.searchVideo(searchData);
      if (!res.ok) {
        toast.dark("API connection error.");
        return;
      }

      setAllResults([...allResults, ...res.data.items]);
      setNextToken(res.data.nextPageToken);
    }
  };

  const fetchNextPage = () => getMoreResults();

  return (
    <div>
      {location["state"] === undefined ? (
        <Redirect to="/" />
      ) : (
        <Box>
          <Text
            sx={textStyle}
          >{`Results Found: ${location.state.totalResults}`}</Text>
          <EndlessList
            allResults={allResults}
            fetchNextPage={fetchNextPage}
            hasMore={allResults.length < location.state.totalResults}
          />
        </Box>
      )}
      <ToastContainer
        position="bottom-center"
        sx={{
          bottom: "0.5rem",
        }}
      />
    </div>
  );
};
const textStyle = { textAlign: "center", mx: ["1rem", "2rem", "4rem", "4rem"] };

export default ResultPage;
