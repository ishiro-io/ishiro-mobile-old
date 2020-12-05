import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { AnimeType } from "shared/graphql/generated";
import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";
import { AnimeInfoTabRoutes } from "shared/navigation/Routes";

import { Episodes } from "./Episodes";
import { AnimeInformations } from "./Informations";
import { AnimeInfoUpper } from "./Upper";

const AnimeInfoTabs = createMaterialTopTabNavigator<AnimeInfoTabRoutes>();

const AnimeInfoContent: React.FC<AnimeInfoContentProps> = ({}: AnimeInfoContentProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const { animeData } = route.params;

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <AnimeInfoUpper />

      <AnimeInfoTabs.Navigator
        initialRouteName="Informations"
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
            alignSelf: "center",
            marginBottom: theme.spacing?.s
          },
          labelStyle: {
            fontFamily: "Poppins_400Regular",
            fontSize: 14
          }
        }}
      >
        <AnimeInfoTabs.Screen
          name="Informations"
          component={AnimeInformations}
          initialParams={{ animeId: animeData.id }}
        />
        {animeData.type === AnimeType.Tv && (
          <AnimeInfoTabs.Screen
            name="Episodes"
            component={Episodes}
            initialParams={{ animeId: animeData.id, animeData }}
          />
        )}
      </AnimeInfoTabs.Navigator>
    </View>
  );
};

export default AnimeInfoContent;

interface AnimeInfoContentProps {}
