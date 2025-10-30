import { configureStore } from "@reduxjs/toolkit";
import articles from "./ArticleSlice";

export const store = configureStore({
  reducer: {
    articles,
  },
});
