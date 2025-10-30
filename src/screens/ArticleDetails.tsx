import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function ArticleDetails({ route }) {
  const {article } = route.params || [];
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{article.title}</Text>
      {article.urlToImage && (
        <Image
          source={{ uri: article.urlToImage }}
          style={[styles.image, { width: screenWidth - 20 }]}
          resizeMode="cover"
        />
      )}
      {article.name ? (
        <Text style={styles.source}>Source: {article.name}</Text>
      ) : null}
      <Text style={styles.description}>
        {article.description || "No description available."}
      </Text>

      {article.content ? (
        <Text style={styles.content}>{article.content}</Text>
      ) : null}
      <Text style={styles.date}>
        {" "}
        Date:{" "}
        {new Date(article.publishedAt).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  image: {
    height: 220,
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E293B",
    marginVertical: 15,
  },
  source: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 22,
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    color: "gray",
    lineHeight: 22,
    marginBottom: 30,
  },
  date: {
    color: "#94A3B8",
    marginVertical: 10,
  },
});
