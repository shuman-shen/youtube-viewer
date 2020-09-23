/** @jsx jsx */
import { jsx, Grid } from "theme-ui";
import ResultItem from "./ResultItem";

const ResultList = ({ allResults }) => {
  return (
    <Grid columns={gridProps.columns} gap={gridProps.gap} sx={gridStyle}>
      {allResults.map((item) => (
        <ResultItem
          key={`${item.id.videoId}_${Math.floor(Math.random() * 1000000)}`}
          item={item}
        />
      ))}
    </Grid>
  );
};

const gridProps = {
  columns: ["1fr", "1fr", "1fr 1fr", "1fr 1fr 1fr"],
  gap: "1.5rem",
};
const gridStyle = {
  marginTop: ["1rem", "1.5rem", "3rem", "4rem"],
  px: ["1rem", "2rem", "4rem", "4rem"],
};

export default ResultList;
