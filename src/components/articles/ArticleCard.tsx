import { View, Text, TouchableOpacity, StyleSheet,Image,Linking } from 'react-native';
import React from 'react'
import { Article } from '@store/ArticleSlice';
import Img from "../../../assets/backgroundImage.png";
export default function ArticleCard({ article,navigation}) {
    const navigateToArticle = (article: Article) => {
  navigation.navigate("ArticleDetails", {
    article
  });
};

 const openArticleURL = () => {
   Linking.openURL(article.url);
 };


  return (
    <TouchableOpacity
      key={article.url}
      style={styles.articleCard}
      onPress={() => {
        navigateToArticle(article);
      }}
    >
      {article.urlToImage && (
        <Image source={{ uri: article.urlToImage }} style={styles.image} />
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.labelName}>{article.source.name}</Text>
        <Text style={styles.title}>{article.title}</Text>
        <TouchableOpacity onPress={openArticleURL}>
          <Text style={styles.link}>see more </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleCard: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 15,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
  },
  image: {
    width: "30%",
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    margin: 10,
  },
  titleContainer: {
    flex: 2,
    flexDirection: "column",
    marginTop: 10,
  },
  title: {
    fontSize: 15,
   
    },
  labelName: {
    fontSize: 12,
    fontWeight:500,
    marginBottom: 5,
    color: "gray",
  },
  link: {
    fontSize: 12,
    color: "blue",
  },
});