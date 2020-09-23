/** @jsx jsx */
import { jsx, Spinner, Text } from "theme-ui";
import InfiniteScroll from "react-infinite-scroll-component";
import ResultList from "./ResultList";

const EndlessList = ({ allResults, fetchNextPage, hasMore = true }) => {
  return (
    <InfiniteScroll
      dataLength={allResults.length}
      next={fetchNextPage}
      hasMore={hasMore}
      loader={<Spinner sx={{ width: "100vw", mx: "auto" }} />}
      endMessage={<Text sx={{ textAlign: "center" }}>End of All Results.</Text>}
    >
      <ResultList allResults={allResults} />
    </InfiniteScroll>
  );
};

export default EndlessList;
