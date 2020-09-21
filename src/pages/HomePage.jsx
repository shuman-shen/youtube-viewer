/** @jsx jsx */
import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { htmlUnescape, htmlEscape } from "escape-goat";
import { jsx, Button, Input, Flex } from "theme-ui";
import searchApi from "../api/search";
import ResultPage from "./ResultPage";

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
      setError("Please enter some keywords to start search.");
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
      <Flex as="form" onSubmit={handleSubmit}>
        <Input
          name="searchField"
          id="searchField"
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button>Submit</Button>
      </Flex>
    </div>
  );
};

export default SearchPage;
