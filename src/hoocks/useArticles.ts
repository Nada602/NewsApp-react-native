
import {
  getarticles,
  Article,
  searchArticle,
  clearSearch,
  filterArticle,
} from "@store/ArticleSlice"; 
import { useEffect, useCallback ,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export  const useArticles=()=>{

 const { isLoading, error, articles, isSearching, searchResults } = useSelector(
   (state: any) => state.articles
 );

 const [searchQuery, setSearchQuery] = useState("");
 const [selectedCategory, setSelectedCategory] = useState<string>("All");
 const dispatch = useDispatch();
 const [filterVisible, setFilterVisible] = useState(false);

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
     setSelectedCategory("All"); // امسح الفئة المختارة

     if (searchText.trim()) {
       dispatch(searchArticle(searchText.trim().toLowerCase()));
     } else {
       dispatch(clearSearch());
       dispatch(getarticles());
     }
   },
   [dispatch]
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
   [dispatch]
 );

 const handleApplyFilters = useCallback(
   (filters: any) => {
     console.log("Applied Filters:", filters);
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
     const categoryNames = filters.categories.map(
       (id: string) => categoryMap[id]
     ); // لو في categories مختارة، ابحث بأول واحدة
     if (categoryNames.length > 0) {
       setSelectedCategory(categoryNames[0]);
       dispatch(searchArticle(categoryNames[0]));
     } else {
       // لو مفيش categories، ارجع للمقالات العادية
       setSelectedCategory("All");
       dispatch(getarticles());
     }
     dispatch(
       filterArticle({
         categories: filters.categories,
         sortBy: filters.sortBy,
         dateRange: filters.dateRange,
       })
     );
   },
   [dispatch, setSelectedCategory]
 );
 let displayArticles;

 if (searchQuery.trim()) {
   console.log("im condetion 1");
   displayArticles = searchResults?.articles;
 } else if (selectedCategory === "All") {
   console.log("im condetion 2");

   displayArticles = articles?.articles;
 } else {
   console.log("im condetion 3");
   displayArticles = searchResults?.articles;
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
    getarticles
  };
}

