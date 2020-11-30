import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { Header } from "components";
import { AnimeViewingStatus } from "shared/graphql/generated";
import {
  StatusListsRoutes,
  StatusListsTabRoutes
} from "shared/navigation/Routes";

import { AnimeInfo } from "../shared/screens/AnimeInfo";
import { StatusListsTabContent } from "./StatusListsTabContent";

const StatusListsStack = createStackNavigator<StatusListsRoutes>();
const StatusListsTabs = createMaterialTopTabNavigator<StatusListsTabRoutes>();

const StatusLists = () => {
  return (
    <StatusListsStack.Navigator
      initialRouteName="StatusLists"
      headerMode="none"
    >
      <StatusListsStack.Screen
        name="StatusLists"
        component={StatusListsContent}
      />
      <StatusListsStack.Screen name="AnimeInfo" component={AnimeInfo} />
    </StatusListsStack.Navigator>
  );
};

const StatusListsContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1 }}>
      <Header label="Mes listes" height={60} />

      <View style={{ flex: 1 }}>
        <StatusListsTabs.Navigator
          tabBarOptions={{
            activeTintColor: theme.colors?.white,
            pressOpacity: 1,
            pressColor: theme.colors?.black,
            indicatorStyle: {
              backgroundColor: theme.colors?.white
            },
            style: {
              backgroundColor: theme.colors?.black,
              width: "100%",
              alignSelf: "center"
            },
            labelStyle: {
              fontFamily: "Poppins_400Regular",
              fontSize: 11
            }
          }}
          initialRouteName="InProgress"
        >
          <StatusListsTabs.Screen
            name="ToSee"
            initialParams={{
              status: AnimeViewingStatus.ToSee
            }}
            component={StatusListsTabContent}
            options={{ tabBarLabel: "A voir" }}
          />
          <StatusListsTabs.Screen
            name="InProgress"
            initialParams={{
              status: AnimeViewingStatus.InProgress
            }}
            component={StatusListsTabContent}
            options={{ tabBarLabel: "En cours" }}
          />
          <StatusListsTabs.Screen
            name="Finished"
            initialParams={{
              status: AnimeViewingStatus.Finished
            }}
            component={StatusListsTabContent}
            options={{ tabBarLabel: "Terminé" }}
          />
          <StatusListsTabs.Screen
            name="Abandonned"
            initialParams={{
              status: AnimeViewingStatus.Abandoned
            }}
            component={StatusListsTabContent}
            options={{ tabBarLabel: "Abandonné" }}
          />
        </StatusListsTabs.Navigator>
      </View>
    </View>
  );
};

export default StatusLists;
