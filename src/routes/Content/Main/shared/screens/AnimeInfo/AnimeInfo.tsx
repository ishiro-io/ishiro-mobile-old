import { useRoute } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import { useAnimeDataQuery } from "shared/graphql/generated";
import { HomeNavigationProps } from "shared/navigation/NavigationProps";
import { AnimeInfoModalRoutes } from "shared/navigation/Routes";

import { AnimeInfoContent } from "./Content";
import { AnimeInfoHeader } from "./Header";
import { ArcListModal } from "./Modals";

const AnimeInfoModalStack = createStackNavigator<AnimeInfoModalRoutes>();

const AnimeInfo: React.FC<AnimeDetailsProps> = ({}: AnimeDetailsProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<HomeNavigationProps<"AnimeInfo">["route"]>();

  const { data, loading } = useAnimeDataQuery({
    variables: { id: route.params.animeId }
  });

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  if (!data?.anime)
    return (
      <View
        style={{
          backgroundColor: theme.colors?.black,
          flex: 1
        }}
      >
        <AnimeInfoHeader hideBookmark />

        <View style={{ marginTop: theme.spacing?.["3xl"] }}>
          <ListEmpty
            title={"Oups! \nIl n'y a rien à afficher ici."}
            subtitle={"(Vérifie ta connexion 👀)"}
          />
        </View>
      </View>
    );

  return (
    <AnimeInfoModalStack.Navigator
      mode="modal"
      headerMode="none"
      initialRouteName="Main"
    >
      <AnimeInfoModalStack.Screen
        name="Main"
        component={AnimeInfoContent}
        initialParams={{
          animeData: data.anime,
          animeId: route.params.animeId
        }}
      />
      <AnimeInfoModalStack.Screen
        name="ArcListModal"
        component={ArcListModal}
      />
    </AnimeInfoModalStack.Navigator>
  );
};

export default AnimeInfo;

interface AnimeDetailsProps {}
