import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { SearchRoutes } from "shared/navigation/Routes";

import { AnimeInfo } from "../shared/screens/AnimeInfo";
import { CategoryList } from "../shared/screens/CategoryList";

const SearchStack = createStackNavigator<SearchRoutes>();

const Search: React.FC = () => {
  return (
    <SearchStack.Navigator initialRouteName="Search" headerMode="none">
      <SearchStack.Screen name="Search" component={SearchContent} />
      <SearchStack.Screen name="AnimeInfo" component={AnimeInfo} />
      <SearchStack.Screen name="CategoryList" component={CategoryList} />
    </SearchStack.Navigator>
  );
};

const SearchContent = () => {
  return <></>;
};

export default Search;
