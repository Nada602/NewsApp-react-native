import { View, TextInput,StyleSheet,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
 function SearchBar({ onSearch, onFilterPress}) {
  const [searchText, setSearchText] = useState("");
  const handleSearh = (q) => {
    setSearchText(q.trim().toLowerCase());
  };
  const clearSearch = () => {
    setSearchText("");
    if (onSearch) {
      onSearch("");
    }
  };

  console.log("hello im sarch")

  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onSearch(searchText.trim().toLowerCase());
          }}
        >
          <MaterialIcons
            name="search"
            size={22}
            color="#555"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Search any news"
          placeholderTextColor="#999"
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.input}
          onChangeText={(q) => {
            handleSearh(q);
          }}
          value={searchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <EvilIcons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity style={styles.filterContainer} onPress={onFilterPress}>
        <FontAwesome6 name="sliders" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(SearchBar)

const styles = StyleSheet.create({
  searchBarContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    
    paddingVertical: 8,
    borderWidth: 1,
    margin: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 3,
  },
  icon: {
    marginHorizontal: 20,
    color: "#333",
  },
  clearButton: {
    padding: 4,
    marginRight: 8,
  },
  filterContainer:{
    
    marginRight:5,
  }
});