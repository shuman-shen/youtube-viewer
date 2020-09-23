/** @jsx jsx */
import { useState, useEffect } from "react";

import { htmlEscape } from "escape-goat";
import { jsx } from "theme-ui";
import searchApi from "../api/search";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../components/SearchBar";

const SearchPage = ({ history, match }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [results]);

  const getSearchResult = async () => {
    if (!query) {
      toast.dark("Enter some keywords to search.");
      return;
    }

    const res = await searchApi.searchVideo({ q: query });
    if (!res.ok) {
      toast.dark(`Ooops...API ERROR. Check your quota!`);
      return;
    }

    setResults(res.data.items);

    let q = query.replace(" ", "+");
    q = htmlEscape(q);

    history.push({
      pathname: "/search",
      search: `?q=${q}`,
      state: {
        query: query,
        results: res.data.items,
        totalResults: res.data.pageInfo.totalResults,
        pageToken: res.data.nextPageToken,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getSearchResult();
  };
  const handleTextChange = (text) => {
    setQuery(text);
  };

  return (
    <div>
      <SearchBar
        handleSubmit={handleSubmit}
        handleTextChange={handleTextChange}
        handleReset={() => setQuery("")}
      />
      <ToastContainer
        position="bottom-center"
        sx={{
          bottom: "0.5rem",
        }}
      />
    </div>
  );
};
export default SearchPage;
