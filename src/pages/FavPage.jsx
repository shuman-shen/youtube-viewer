/** @jsx jsx */

import { useState, useEffect } from "react";

const { jsx, Card, Image, Text, Heading } = require("theme-ui");

const FavPage = () => {
  const [favList, setFavList] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("ytbFav")) {
      const result = JSON.parse(window.localStorage.getItem("ytbFav"));
      setFavList(result);
    }
  }, []);
  return (
    <div>
      {favList.map(
        ({
          title,
          description,
          channelId,
          channelTitle,
          publishedAt,
          thumbnail,
        }) => (
          <Card>
            <Image src={thumbnail} />
            <Heading as="h4">{title}</Heading>
            <Text>{description}</Text>
            <Text>{channelTitle}</Text>
            <Text>{publishedAt}</Text>
          </Card>
        )
      )}
    </div>
  );
};

export default FavPage;
