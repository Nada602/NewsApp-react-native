import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/ArticlesApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { store } from "..";

// article data structure
export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface ArticleState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  searchResults: Article[];
  isSearching: boolean;
}

const initialState: ArticleState = {
  articles: [],
  isLoading: false,
  error: null,
  searchResults: [],
  isSearching: false,
};

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

//thunk func to fetch data

export const getarticles = createAsyncThunk<
  NewsApiResponse,
  void,
  { rejectValue: string }
>("articles/getarticles", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<NewsApiResponse>("/top-headlines", {
      params: { q: "all" },
    });

    return response.data;
  } catch (error) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch articles",
    );
  }
});

// thunk for api search

export const searchArticle = createAsyncThunk<
  NewsApiResponse,
  String,
  { rejectValue: string }
>("articles/searcharticles", async (searchQuery: string, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<NewsApiResponse>("/everything", {
      params: {
        q: searchQuery,
        language: "en",
        sortBy: "publishedAt",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const filterArticle = createAsyncThunk<
  NewsApiResponse,
  { categories: string[]; sortBy: string; dateRange: string },
  { rejectValue: string }
>("articles/filterarticles", async (filterQuery, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const response = await api.get<NewsApiResponse>("/everything", {
      params: {
        q: "",
        from: "",
        to: "",
        sortBy: "",
      },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const ArticleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchResults = [];
      state.isSearching = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // reducer to listen at get articles and dispatch action
    builder
      .addCase(getarticles.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getarticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.articles;
      })
      .addCase(getarticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || null;
      });
    //  reducer for search articles
    builder.addCase(searchArticle.pending, (state, action) => {
      state.isSearching = true;
      state.error = null;
    });
    builder.addCase(searchArticle.fulfilled, (state, action) => {
      state.isSearching = false;
      state.searchResults = action.payload.articles;
    });
    builder.addCase(searchArticle.rejected, (state, action) => {
      state.isSearching = false;
      state.error = action.payload as string;
      state.searchResults = [];
    });
  },
});

export const { clearSearch } = ArticleSlice.actions;

export default ArticleSlice.reducer;
