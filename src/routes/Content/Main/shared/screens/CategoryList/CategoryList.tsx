import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import { Header } from "components";
import {
  HomeNavigationProps,
  SearchNavigationProps
} from "shared/navigation/NavigationProps";

import CategoryFlatList from "./FlatList/CategoryFlatList";

const CategoryList: React.FC<CategoryListProps> = ({}: CategoryListProps) => {
  const navigation = useNavigation<
    (
      | SearchNavigationProps<"CategoryList">
      | HomeNavigationProps<"CategoryList">
    )["navigation"]
  >();

  const route = useRoute<
    (
      | SearchNavigationProps<"CategoryList">
      | HomeNavigationProps<"CategoryList">
    )["route"]
  >();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header
        label={route.params.categoryName}
        iconLeft={
          <MaterialIcons
            name="keyboard-arrow-left"
            size={moderateScale(32)}
            color="white"
          />
        }
        onIconLeftPress={() => navigation.goBack()}
      />

      <CategoryFlatList />
    </View>
  );
};

export default CategoryList;

interface CategoryListProps {}
