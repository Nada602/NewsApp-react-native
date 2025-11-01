
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  SafeAreaView,
} from "react-native";
import {
  Briefcase,
  Smartphone,
  Trophy,
  Film,
  TrendingUp,
  Heart,
  FlaskConical,
  Globe,
  X,
  Check,
} from "lucide-react-native";

interface FilterScreenProps {
  visible: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterData) => void;
 
}

interface FilterData {
  categories: string[];
  sortBy: string;
  dateRange: string;
}

export default function FilterScreen({
  visible,
  onClose,
  onApplyFilters,
}: FilterScreenProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSortBy, setSelectedSortBy] = useState<string>("latest");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");


  const categories = [
    { id: "1", name: "Politics", Icon: Briefcase },
    { id: "2", name: "Technology", Icon: Smartphone },
    { id: "3", name: "Sports", Icon: Trophy },
    { id: "4", name: "Entertainment", Icon: Film },
    { id: "5", name: "Business", Icon: TrendingUp },
    { id: "6", name: "Health", Icon: Heart },
    { id: "7", name: "Science", Icon: FlaskConical },
    { id: "8", name: "World", Icon: Globe },
  ];

  
  const sortOptions = [
    { id: "latest", label: "Latest First" },
    { id: "oldest", label: "Oldest First" },
    { id: "popular", label: "Most Popular" },
    { id: "relevant", label: "Most Relevant" },
  ];

  const dateRanges = [
    { id: "all", label: "All Time" },
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
  ];

  // Toggle Category
  const toggleCategory = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };


  const applyFilters = () => {
    const filters: FilterData = {
      categories: selectedCategories,
      sortBy: selectedSortBy,
      dateRange: selectedDateRange,
    };
    onApplyFilters(filters);
    onClose();
  };

  
  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSortBy("latest");
    setSelectedDateRange("all");
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <X size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Filters</Text>
          <TouchableOpacity onPress={clearAllFilters}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Categories Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => {
                const isSelected = selectedCategories.includes(category.id);
                const IconComponent = category.Icon;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryCard,
                      isSelected && styles.categoryCardSelected,
                    ]}
                    onPress={() => toggleCategory(category.id)}
                    activeOpacity={0.7}
                  >
                    <IconComponent
                      size={32}
                      color={isSelected ? "#fff" : "#666"}
                    />
                    <Text
                      style={[
                        styles.categoryText,
                        isSelected && styles.categoryTextSelected,
                      ]}
                    >
                      {category.name}
                    </Text>
                    {isSelected && (
                      <View style={styles.checkmark}>
                        <Check size={16} color="#fff" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Sort By Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sort By</Text>
            <View style={styles.radioGroup}>
              {sortOptions.map((option) => {
                const isSelected = selectedSortBy === option.id;
                return (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.radioOption}
                    onPress={() => setSelectedSortBy(option.id)}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.radioCircle,
                        isSelected && styles.radioCircleSelected,
                      ]}
                    >
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <Text style={styles.radioLabel}>{option.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Date Range Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Date Range</Text>
            <View style={styles.chipsContainer}>
              {dateRanges.map((range) => {
                const isSelected = selectedDateRange === range.id;
                return (
                  <TouchableOpacity
                    key={range.id}
                    style={[styles.chip, isSelected && styles.chipSelected]}
                    onPress={() => setSelectedDateRange(range.id)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        isSelected && styles.chipTextSelected,
                      ]}
                    >
                      {range.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Apply Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={applyFilters}
            activeOpacity={0.8}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  clearText: {
    color: "#667eea",
    fontSize: 15,
    fontWeight: "600",
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
    position: "relative",
  },
  categoryCardSelected: {
    backgroundColor: "#667eea",
    borderColor: "#5568d3",
  },
  categoryText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  categoryTextSelected: {
    color: "#fff",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    borderColor: "#667eea",
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#667eea",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  chipSelected: {
    backgroundColor: "#667eea",
    borderColor: "#667eea",
  },
  chipText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#fff",
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  applyButton: {
    backgroundColor: "#667eea",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
});
