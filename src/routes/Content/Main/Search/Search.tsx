import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { Header } from "components";
import { SearchRoutes, SearchTabRoutes } from "shared/navigation/Routes";

import { AnimeInfo } from "../shared/screens/AnimeInfo";
import { CategoryList } from "../shared/screens/CategoryList";
import { OpenSearchContent } from "./OpenSearchContent";
import { SearchAll } from "./SearchAll";
import { SearchGenres } from "./SearchGenres";
import { SearchInput } from "./SearchInput";

const SearchStack = createStackNavigator<SearchRoutes>();
const SearchTabs = createMaterialTopTabNavigator<SearchTabRoutes>();

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
  const { theme } = useContext(ThemeContext);

  const [isSearchContentOpen, setIsSearchContentOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <View style={{ flex: 1 }}>
      {!isSearchContentOpen && <Header label="Rechercher" height={60} />}

      <SearchInput
        isOpen={isSearchContentOpen}
        setIsOpen={setIsSearchContentOpen}
        onFocus={() => setIsSearchContentOpen(true)}
        {...{ value, setValue }}
      />

      {isSearchContentOpen ? (
        <View style={{ flex: 1 }}>
          <OpenSearchContent searchValue={value} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <SearchTabs.Navigator
            tabBarOptions={{
              activeTintColor: theme.colors?.white,
              pressOpacity: 1,
              pressColor: theme.colors?.black,
              indicatorStyle: {
                backgroundColor: theme.colors?.white
              },
              style: {
                backgroundColor: theme.colors?.black,
                width: "95%",
                alignSelf: "center"
              },
              labelStyle: {
                fontFamily: "Poppins_400Regular",
                fontSize: 12
              }
            }}
          >
            <SearchTabs.Screen name="Genres" component={SearchGenres} />
            <SearchTabs.Screen name="Tous" component={SearchAll} />
          </SearchTabs.Navigator>
        </View>
      )}
    </View>
  );
};

export default Search;
