/** @jsx jsx */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { htmlUnescape } from "escape-goat";
import {
  jsx,
  Button,
  Input,
  Flex,
  Grid,
  Card,
  Image,
  Text,
  Heading,
  Box,
  Link as AppLink,
  Spinner,
} from "theme-ui";
import searchApi from "../api/search";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [pageInfo, setPageInfo] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   return clearState();
  // }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [results]);

  const clearState = () => {
    setQuery("");
    setResults([]);
    setPageInfo();
    setCurrentPage(1);
  };
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
      <Box>
        <Text>{error}</Text>
        <Spinner size={60} sx={{ display: loading ? null : "none" }} />
      </Box>
      <Grid>
        {results.map((item) => (
          <Card key={item.id.videoId}>
            <Image src={item.snippet.thumbnails.high.url} />
            <AppLink
              as={Link}
              to={{
                pathname: `/video/${item.id.videoId}`,
                state: {
                  title: htmlUnescape(item.snippet.title),
                  description: item.snippet.description,
                  publishedAt: item.snippet.publishedAt,
                  channelId: item.snippet.channelId,
                  channelTitle: item.snippet.channelTitle,
                },
              }}
            >
              <Heading as="h4">{htmlUnescape(item.snippet.title)}</Heading>
            </AppLink>
          </Card>
        ))}
      </Grid>
      {pageInfo && (
        <Box>
          <Text>{`Total results: ${pageInfo.totalResults}`}</Text>
          <Text>{`You're on page ${currentPage} of ${Math.ceil(
            pageInfo.totalResults / searchApi.MAX_RESULTS
          )}`}</Text>
          <Flex>
            {pageInfo["prevPageToken"] === undefined ? null : (
              <Button onClick={() => handleClick(pageInfo.prevPageToken, -1)}>
                Previous Page
              </Button>
            )}
            <Button onClick={() => handleClick(pageInfo.nextPageToken, 1)}>
              Next Page
            </Button>
          </Flex>
        </Box>
      )}
    </div>
  );
};

export default SearchPage;
