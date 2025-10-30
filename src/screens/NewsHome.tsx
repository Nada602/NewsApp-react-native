import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StyleSheet, Dimensions } from "react-native";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ArticleCard from "@components/articles/ArticleCard";
import SearchBar from "@components/articles/SearchBar";
import Categories from "@components/articles/Categories";
import Feather from "@expo/vector-icons/Feather";
import { Article,getarticles,searchArticle } from "../store/ArticleSlice";
import FilterScreen from "./FilterScreen";
import { useArticles } from '../hoocks/useArticles';
export default function NewsHome({ navigation }) {
 const {
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
   setSelectedCategory,
 } = useArticles();
  return (
    <ScrollView>
      <View style={styles.container}>
        <SearchBar
          onSearch={handleSearch}
          onFilterPress={() => setFilterVisible(!filterVisible)}
        />
        <Categories
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          onFilterPress={() => setFilterVisible(!filterVisible)}
        />

        <FilterScreen
          visible={filterVisible}
          onClose={() => setFilterVisible(false)}
          onApplyFilters={handleApplyFilters}
        />

        {/* Loading State */}
        {isLoadingData && <LoadingSpinner />}

        {/* Error State */}
        {error && !isLoadingData && (
          <View style={styles.errorContainer}>
            <View style={styles.errorIcon}>
              <Feather name="alert-triangle" size={60} color="red" />
            </View>
            <Text style={styles.error}>{error}</Text>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() => {
                if (searchQuery.trim()) {
                  dispatch(searchArticle(searchQuery));
                } else {
                  dispatch(getarticles());
                }
              }}
            >
              <Text style={styles.retryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Success State */}
        {!error && !isLoadingData && (
          <>
            <View style={styles.headerContainer}>
              {searchQuery.trim() ? (
                <Text style={styles.resultText}>
                  Found {displayArticles.length} results for "{searchQuery}"
                </Text>
              ) : (
                <Text style={styles.resultText}>
                  {selectedCategory === "All"
                    ? "All News"
                    : `${selectedCategory} News`}
                </Text>
              )}
            </View>

            {/* Articles List */}

            {displayArticles && displayArticles.length > 0 ? (
              displayArticles.map((article: Article) => (
                <View key={article.url}>
                  <ArticleCard navigation={navigation} article={article} />
                </View>
              ))
            ) : (
              <View style={styles.noResultsContainer}>
                <View style={styles.noResultsIcon}>
                  <Feather name="search" size={24} color="black" />
                </View>
                <Text style={styles.noResults}>No articles found</Text>
                <Text style={styles.noResultsSubtext}>
                  Try different keywords or categories
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    minHeight: height - 100,
  },
  headerContainer: {
    marginVertical: 15,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height * 0.5,
    paddingHorizontal: 20,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  error: {
    color: "#d32f2f",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "500",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 10,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: height * 0.4,
    paddingHorizontal: 20,
  },
  noResultsIcon: {
    fontSize: 60,
    marginBottom: 20,
    opacity: 0.5,
  },
  noResults: {
    fontSize: 20,
    color: "#666",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "center",
  },
  noResultsSubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
});
