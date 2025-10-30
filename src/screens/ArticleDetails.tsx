import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";

export default function ArticleDetails({ route }) {
  const {title, name, urlToImage, description, content } = route.params || {};
  const screenWidth = Dimensions.get("window").width;

  return (
    <ScrollView style={styles.container}>
      {urlToImage && ( 
        <Image
          source={{ uri: urlToImage }}
          style={[styles.image, { width: screenWidth - 20 }]}
          resizeMode="cover"
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {name ? <Text style={styles.source}>Source: {name}</Text> : null}      
      <Text style={styles.description}>
        { description || "No description available." }
      </Text>

      {content ? <Text style={styles.content}>{content}</Text> : null}
    </ScrollView>
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
    color: "#333",
    marginBottom: 10,
  },
  source: {
    fontSize: 14,
    color: "#888",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 10,
  },
  content: {
    fontSize: 15,
    color: "#444",
    lineHeight: 22,
    marginBottom: 30,
  },
});
