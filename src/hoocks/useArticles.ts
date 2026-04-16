import { useAppDispatch } from "@store/index";
import {
  getarticles,
  searchArticle,
  clearSearch,
  filterArticle,
} from "@store/slices/ArticleSlice";
import { useEffect, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useArticles = () => {
  const { isLoading, error, articles, isSearching, searchResults } =
    useSelector((state: any) => state.articles);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const dispatch = useAppDispatch();
  const [filterVisible, setFilterVisible] = useState(false);
  const categoryMap: any = {
    "1": "politics",
    "2": "technology",
    "3": "sports",
    "4": "entertainment",
    "5": "business",
    "6": "health",
    "7": "science",
    "8": "world",
  };
  useEffect(() => {
    dispatch(getarticles());
  }, [dispatch]);

  // dispatch action for search api call
  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchArticle(searchQuery.trim().toLowerCase()));
    } else {
      dispatch(clearSearch());
    }
  }, [searchQuery, dispatch]);

  const handleSearch = useCallback(
    (searchText: string) => {
      console.log("im handel search");
      setSearchQuery(searchText);
      setSelectedCategory("All");

      if (searchText.trim()) {
        dispatch(searchArticle(searchText.trim().toLowerCase()));
      } else {
        dispatch(clearSearch());
        dispatch(getarticles());
      }
    },
    [dispatch],
  );

  const handleCategorySelect = useCallback(
    (category: string) => {
      console.log("im handel category");
      setSelectedCategory(category);
      setSearchQuery("");
      dispatch(clearSearch());

      if (category === "All") {
        dispatch(getarticles());
      } else {
        dispatch(searchArticle(category.toLowerCase()));
      }
    },
    [dispatch],
  );

  const handleApplyFilters = useCallback(
    (filters: { categories: string[]; sortBy: string; dateRange: string }) => {
      console.log("Applied Filters:", filters);

      const categoryNames = filters.categories.map(
        (id: string) => categoryMap[id],
      );
      if (categoryNames.length > 0) {
        setSelectedCategory(categoryNames[0]);
        dispatch(searchArticle(categoryNames[0]));
      } else {
        // return to getarticles
        setSelectedCategory("All");
        dispatch(getarticles());
      }
      dispatch(
        filterArticle({
          categories: filters.categories,
          sortBy: filters.sortBy,
          dateRange: filters.dateRange,
        }),
      );
    },
    [dispatch, setSelectedCategory],
  );
  let displayArticles;

  if (searchQuery.trim()) {
    displayArticles = searchResults;
  } else if (selectedCategory === "All") {
    displayArticles = articles;
  } else {
    displayArticles = searchResults;
  }

  const isLoadingData =
    searchQuery.trim() || selectedCategory !== "All" ? isSearching : isLoading;

  return {
    displayArticles,
    handleCategorySelect,
    handleApplyFilters,
    handleSearch,
    filterVisible,
    selectedCategory,
    searchQuery,
    error,
    isLoadingData,
    setFilterVisible,
    dispatch,
    searchArticle,
    getarticles,
    setSelectedCategory,
  };
};
