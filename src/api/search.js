import apiClient from "./client";

const KEY = `ENTER YOUR KEY`;
const MAX_RESULTS = 10;
const searchVideo = (query) =>
  apiClient.get("/search", {
    part: "snippet",
    maxResults: MAX_RESULTS,
    type: "video",
    key: KEY,
    ...query,
  });

export default {
  MAX_RESULTS,
  searchVideo,
};
