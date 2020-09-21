/** @jsx jsx */
import { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { htmlUnescape } from "escape-goat";
import {
  jsx,
  Grid,
  Card,
  Image,
  Heading,
  Link as AppLink,
  Spinner,
} from "theme-ui";
import searchApi from "../api/search";
import PlayerPage from "./PlayerPage";
import InfiniteScroll from "react-infinite-scroll-component";

const ResultPage = ({ location: { state } }) => {
  const { query, results, pageToken } = state;
  const [allResults, setAllResults] = useState([]);
  const [nextToken, setNextToken] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setAllResults(results);
    setNextToken(pageToken);
  }, []);

  const getMoreResults = async () => {
    if (!nextToken) {
      setError("There're no more new results.");
      return;
    }

    let searchData = {
      q: query,
      pageToken: nextToken,
    };
    console.log(searchData);
    const res = await searchApi.searchVideo(searchData);
    if (!res.ok) {
      setError("Bad request.");
      console.log(res.problem);
      return;
    }

    setAllResults([...allResults, ...res.data.items]);
    setNextToken(res.data.nextPageToken);
  };

  const fetchNextPage = () => getMoreResults();

  return (
    <div>
      <Route path={`/video/:videoId`} component={PlayerPage} />
      <InfiniteScroll
        dataLength={allResults.length}
        next={() => fetchNextPage()}
        hasMore={true}
        loader={<Spinner />}
      >
        <Grid>
          {allResults.map((item) => (
            <Card key={`${item.id.videoId}`}>
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
                    thumbnail: item.snippet.thumbnails.high.url,
                  },
                }}
              >
                <Heading as="h4">{htmlUnescape(item.snippet.title)}</Heading>
              </AppLink>
            </Card>
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

export default ResultPage;