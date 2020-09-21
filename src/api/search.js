import apiClient from "./client";

const KEY = `AIzaSyADoJWJRl4amb1ij590DW_STPx-TiXu5wg`;
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
