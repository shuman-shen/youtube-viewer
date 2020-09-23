/** @jsx jsx */
import { jsx, Box, Button, Embed, Flex, Heading, Text } from "theme-ui";
import { htmlUnescape } from "escape-goat";

const Player = ({ item, fav, onClick }) => {
  const { title, description, publishedAt } = item.snippet;

  const publishedAtLocal = new Date(publishedAt).toLocaleString("en-AU", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  const EMBED_BASE_LINK = "https://www.youtube.com/embed/";
  return (
    <Box sx={boxStyle}>
      <Embed src={`${EMBED_BASE_LINK}${item.id.videoId}`} />
      <Box>
        <Heading sx={headingStyle} as="h3">
          {htmlUnescape(title)}
        </Heading>
        <Flex sx={descStyle}>
          <Text>{publishedAtLocal}</Text>
          <Button sx={favBtnStyle} onClick={onClick}>
            {fav ? `Remove \u2764` : "Add \u2764"}
          </Button>
        </Flex>

        <Text>{htmlUnescape(description)}</Text>
      </Box>
    </Box>
  );
};

const boxStyle = { width: ["90%", "90%", "75%", "60%"] };
const descStyle = { justifyContent: "space-between", marginBottom: "1rem" };
const favBtnStyle = { mx: "1em" };
const headingStyle = { lineHeight: "2rem", my: "1rem" };

export default Player;
