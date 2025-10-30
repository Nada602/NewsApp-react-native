import { View, Text, TouchableOpacity, StyleSheet,Image,Linking } from 'react-native';
import React from 'react'
import { Article } from '@store/ArticleSlice';
import Img from "../../../assets/backgroundImage.png";
export default function ArticleCard({ article,navigation}) {
    const navigateToArticle = (article: Article) => {
  navigation.navigate("ArticleDetails", {
    id: article.source?.id || "",
    title: article.title,
    name: article.source?.name || "",
    urlToImage: article.urlToImage,
    description: article.description,
    content: article.content,
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
        <Text style={styles.title}>{article.source.name}</Text>
        <TouchableOpacity onPress={openArticleURL}>
          <Text style={styles.link}>see more </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleCard: {
    flex:1,
    flexDirection:"row",
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
    margin:10
  },
  titleContainer:{
    flex:2,
    flexDirection:"column",
  },
  title: {
    fontSize: 15,
    fontWeight: 400,
    marginBottom: 5,
    color:'gray'
  },
  link: {
    fontSize: 12,
    color: "blue",
    
  },
});