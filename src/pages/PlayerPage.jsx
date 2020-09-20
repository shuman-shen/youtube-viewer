/** @jsx jsx */
import { useState, useEffect } from "react";
import { jsx, Embed, Heading, Link, Text, Box, Button } from "theme-ui";

const PlayerPage = ({ match, location }) => {
  const {
    params: { videoId },
  } = match;

  const {
    title,
    description,
    channelId,
    channelTitle,
    publishedAt,
  } = location.state;

  const [fav, setFav] = useState(false);
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      //setFavList(resulte)
      if (result[videoId]) {
        setFav(true);
      }
    } else {
      const initialObj = {};
      window.localStorage.setItem("ytbFav", JSON.stringify(initialObj));
    }
  }, []);

  const handleClick = () => {
    const result = window.localStorage.getItem("ytbFav");
    let toObj = {};
    if (result) {
      toObj = JSON.parse(result);
    }
    if (!fav) {
      toObj[videoId] = new Date().toISOString();
      const objStr = JSON.stringify(toObj);
      window.localStorage.setItem("ytbFav", objStr);
      setFav(true);
    } else {
      delete toObj[videoId];
      window.localStorage.setItem("ytbFav", JSON.stringify(toObj));
      setFav(false);
    }
  };

  const EMBED_BASE_LINK = "https://www.youtube.com/embed/";
  const CHANNEL_BASE_LINK = "https://www.youtube.com/channel/";
  //console.log(prayerProps);
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
};

export default PlayerPage;
