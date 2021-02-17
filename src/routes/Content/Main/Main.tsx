import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { ThemeContext } from "react-native-elements";

import { MainTabsRoutes } from "shared/navigation/Routes";

import { Home } from "./Home";
import { Search } from "./Search";
import { StatusLists } from "./StatusLists";

const MainTabs = createBottomTabNavigator<MainTabsRoutes>();

const Main: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <MainTabs.Navigator
      initialRouteName="Recherche"
      lazy={false}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Accueil")
            return focused ? (
              <MaterialIcons name="home" {...{ color, size }} />
            ) : (
              <MaterialCommunityIcons
                name="home-outline"
                {...{ color, size }}
              />
            );

          if (route.name === "Recherche")
            return <MaterialIcons name="search" {...{ color, size }} />;

          if (route.name === "Listes")
            return focused ? (
              <MaterialIcons name="bookmark" {...{ color, size }} />
            ) : (
              <MaterialIcons name="bookmark-border" {...{ color, size }} />
            );

          return <MaterialIcons name="crop-square" {...{ color, size }} />;
        }
      })}
      tabBarOptions={{
        activeTintColor: theme.colors?.white,
        style: {
          backgroundColor: theme.colors?.black,
          borderTopColor: theme.colors?.black
        },
        labelStyle: {
          fontFamily: "Poppins_400Regular",
          fontSize: theme.textSize.s
        },
        tabStyle: { backgroundColor: theme.colors?.black }
      }}
    >
      <MainTabs.Screen name="Accueil" component={Home} />
      <MainTabs.Screen name="Recherche" component={Search} />
      <MainTabs.Screen name="Listes" component={StatusLists} />
    </MainTabs.Navigator>
  );
};

export default Main;
