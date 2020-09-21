/** @jsx jsx */
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { jsx, Embed, Heading, Link, Text, Box, Button } from "theme-ui";

const PlayerPage = ({ match: { params }, location }) => {
  const { videoId } = params;
  const [fav, setFav] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      const found = result.find((item) => item.videoId === videoId);
      if (found) {
        setFav(true);
      }
    } else {
      const initialArray = [];
      window.localStorage.setItem("ytbFav", JSON.stringify(initialArray));
    }
  }, []);

  const handleClick = () => {
    const {
      title,
      description,
      channelId,
      channelTitle,
      publishedAt,
      thumbnail,
    } = location.state;
    const result = window.localStorage.getItem("ytbFav");
    let toArray = [];
    let found = false;
    if (result) {
      toArray = JSON.parse(result);
      found = toArray.find((item) => item.videoId === videoId);
    }

    if (!fav && !found) {
      toArray.push({
        videoId,
        title,
        description,
        channelId,
        channelTitle,
        publishedAt,
        thumbnail,
      });
      const arrayStr = JSON.stringify(toArray);
      window.localStorage.setItem("ytbFav", arrayStr);
      setFav(true);
    } else if (!fav && found) {
      setFav(true);
    } else if (fav && !found) {
      const newArray = toArray.filter((item) => item.videoId !== videoId);
      window.localStorage.setItem("ytbFav", JSON.stringify(newArray));
      setFav(false);
    } else {
      setFav(false);
    }
  };

  const EMBED_BASE_LINK = "https://www.youtube.com/embed/";
  const CHANNEL_BASE_LINK = "https://www.youtube.com/channel/";

  if (location["state"] !== undefined) {
    const {
      title,
      description,
      channelId,
      channelTitle,
      publishedAt,
      thumbnail,
    } = location.state;
    return (
      <div>
        <Embed src={`${EMBED_BASE_LINK}${videoId}`} />
        <Box>
          <Heading as="h3">{title}</Heading>
          <Text>{description}</Text>
          <Text>{publishedAt}</Text>
          <Link href={`${CHANNEL_BASE_LINK}${channelId}`} target="_blank">
            {channelTitle}
          </Link>
          <Button onClick={handleClick}>
            {fav ? `Remove from Favourite` : "Add to Favourite"}
          </Button>
        </Box>
      </div>
    );
  } else {
    return <Redirect to="/notfound" />;
  }
};

export default PlayerPage;
