/** @jsx jsx */
import { jsx, Card, Image, Heading, Link as AppLink } from "theme-ui";
import { Link } from "react-router-dom";
import { htmlUnescape } from "escape-goat";

const ResultItem = ({ item }) => {
  return (
    <Card sx={cardStyle}>
      <AppLink
        as={Link}
        to={{
          pathname: `/video/${item.id.videoId}`,
          state: {
            item,
          },
        }}
      >
        <Image src={item.snippet.thumbnails.high.url} />
        <Heading as="h3" sx={{ lineHeight: "2rem" }}>
          {htmlUnescape(item.snippet.title)}
        </Heading>
      </AppLink>
    </Card>
  );
};

const cardStyle = {
  marginBottom: ["1rem", "1rem", "2rem", "2rem"],
  borderBottom: "hsl(260, 20%, 40%) solid 4px",
  maxWidth: "480px",
};

export default ResultItem;
