import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Category {
  id: string;
  name: string;
}

interface CategoriesProps {
  onCategorySelect?: (category: string) => void;
  onFilterPress: any;
  selectedCategory: string;
  setSelectedCategory: (categoryName:string) => void;
}

 function Categories({
   onCategorySelect,
   onFilterPress,
   setSelectedCategory,
   selectedCategory,
 }: CategoriesProps) {
   const categories: Category[] = [
     { id: "1", name: "All" },
     { id: "2", name: "Business" },
     { id: "3", name: "Entertainment" },
     { id: "4", name: "General" },
     { id: "5", name: "Health" },
     { id: "6", name: "Science" },
     { id: "7", name: "Sports" },
     { id: "8", name: "Technology" },
     { id: "9", name: "World" },
     { id: "10", name: "Politics" },
   ];

   const handleCategoryPress = (categoryName: string) => {
     setSelectedCategory(categoryName);
     if (onCategorySelect) {
       onCategorySelect(categoryName);
     }
   };
   console.log("hello im Category");
   return (
     <View style={styles.container}>
       <ScrollView
         horizontal
         showsHorizontalScrollIndicator={false}
         contentContainerStyle={styles.scrollContent}
       >
         {categories.map((category) => {
           const isSelected = selectedCategory === category.name;
           return (
             <TouchableOpacity
               key={category.id}
               style={[
                 styles.categoryChip,
                 isSelected && styles.categoryIsSelected,
               ]}
               onPress={() => handleCategoryPress(category.name)}
               activeOpacity={0.7}
             >
               <Text
                 style={[
                   styles.categoryText,
                   isSelected && styles.categoryTextSelected,
                 ]}
               >
                 {category.name}
               </Text>
             </TouchableOpacity>
           );
         })}
       </ScrollView>
     </View>
   );
 }

export default React.memo(Categories);

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryIsSelected: {
    backgroundColor: "#000",
    borderColor: "#000",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  categoryTextSelected: {
    color: "#fff",
  },
});
