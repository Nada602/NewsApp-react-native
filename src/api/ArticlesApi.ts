import axios from "axios";

const NEWS_API_KEY = "68dd6390062245d8b273cffda0c91f98";
const API_BASE_URL = "https://newsapi.org/v2";
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      apikey: NEWS_API_KEY,
    };
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

api.interceptors.response.use(
  (response) => response,
  (err) => {
    if (err.response) {
      console.log("Api Error", err.response.data);
    }
    return Promise.reject(err);
  }
);

export default api;
