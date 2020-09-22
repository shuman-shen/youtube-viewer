/** @jsx jsx */
import { useState, useEffect } from "react";

import { htmlEscape } from "escape-goat";
import { jsx, Button, Input, Flex, Text, Message } from "theme-ui";
import searchApi from "../api/search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SearchPage = ({ history, match }) => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [results]);

  const getSearchResult = async (pageChange) => {
    if (!query) {
      toast("Please enter some keywords to start search.");
      return;
    }
    let searchData = {
      q: query,
    };
    if (pageChange) {
      searchData = { ...searchData, pageToken: pageChange.pageToken };
    }
    setLoading(true);
    const res = await searchApi.searchVideo(searchData);
    // const resultItems = res.data.items;
    setResults(res.data.items);

    let pagination = {
      nextPageToken: res.data.nextPageToken,
      totalResults: res.data.pageInfo.totalResults,
      resultsPerPage: res.data.pageInfo.resultsPerPage,
    };
    if (res.data.prevPageToken) {
      pagination = { ...pagination, prevPageToken: res.data.prevPageToken };
    }

    if (pageChange) {
      setCurrentPage(currentPage + pageChange.nextPage);
    } else {
      setCurrentPage(1);
    }
    setPageInfo(pagination);
    setLoading(false);

    let q = query.replace(" ", "+");
    q = htmlEscape(q);

    history.push({
      pathname: "/search",
      search: `?q=${q}`,
      state: {
        query: query,
        results: res.data.items,
        pageToken: res.data.nextPageToken,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResult();
  };

  const handleClick = (pageToken, count) => {
    getSearchResult({
      pageToken: pageToken,
      nextPage: count,
    });
  };

  return (
    <div>
      <Flex
        as="form"
        onSubmit={handleSubmit}
        sx={{
          mx: "3rem",
          height: "80vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Input
          name="searchField"
          id="searchField"
          placeholder="Type to search..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <Flex>
          <Button
            sx={{ width: "30vw", my: "1.5rem", mx: "1rem" }}
            type="reset"
            onClick={(e) => {
              setQuery("");
            }}
          >
            Reset
          </Button>
          <Button
            sx={{ width: "30vw", my: "1.5rem", mx: "1rem" }}
            type="submit"
          >
            Search
          </Button>
        </Flex>
        <Text>Youtube search starts here.</Text>
      </Flex>
      <ToastContainer />
    </div>
  );
};

export default SearchPage;
