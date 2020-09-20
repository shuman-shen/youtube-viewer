import { create } from "apisauce";

const apiClient = create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

export default apiClient;
