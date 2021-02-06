import { NetworkStatus } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import { AnimeViewStatus, useHomeAnimesQuery } from "shared/graphql/generated";
import {
  HomeNavigationProps,
  StatusListsTabNavigationProps
} from "shared/navigation/NavigationProps";

import { HomePreviewList, HomePreviewListProps } from "./HomePreviewList";

const HomeFlatPreviewList: React.FC<ListsScrollViewProps> = ({}: ListsScrollViewProps) => {
  const { theme } = useContext(ThemeContext);

  const homeNavigation = useNavigation<
    HomeNavigationProps<"Home">["navigation"]
  >();

  const statusListNavigation = useNavigation<
    StatusListsTabNavigationProps<any>["navigation"]
  >();

  const { data, loading, networkStatus, refetch } = useHomeAnimesQuery();

  const [hasListBeenPopulated, setHasListBeenPopulated] = useState(false);
  const [cardsLists, setCardsLists] = useState<HomePreviewListProps[]>();

  useEffect(() => {
    if (!loading) {
      let newCardsList: HomePreviewListProps[] = [];

      if (data?.userAnimeViewsByStatus?.fields.length) {
        newCardsList.push({
          title: "En cours",
          animes: data.userAnimeViewsByStatus.fields.map((f) => {
            return { ...f.anime, nextEpisode: f.nextEpisodeToSee?.number };
          }),
          total: data.userAnimeViewsByStatus.total,
          onSeeMoreCardPress: () =>
            statusListNavigation.navigate("InProgress", {
              status: AnimeViewStatus.InProgress
            })
        });
      }

      newCardsList.push({
        title: data?.action?.name!,
        animes: data?.action?.animes,
        onSeeMoreCardPress: () =>
          statusListNavigation.navigate("InProgress", {
            status: AnimeViewStatus.InProgress
          })
      });

      newCardsList.push({
        title: data?.romance?.name!,
        animes: data?.romance?.animes,
        onSeeMoreCardPress: () =>
          statusListNavigation.navigate("InProgress", {
            status: AnimeViewStatus.InProgress
          })
      });

      newCardsList.push({
        title: data?.comedie?.name!,
        animes: data?.comedie?.animes,
        onSeeMoreCardPress: () =>
          statusListNavigation.navigate("InProgress", {
            status: AnimeViewStatus.InProgress
          })
      });

      newCardsList.push({
        title: data?.drame?.name!,
        animes: data?.drame?.animes,
        onSeeMoreCardPress: () =>
          statusListNavigation.navigate("InProgress", {
            status: AnimeViewStatus.InProgress
          })
      });

      newCardsList.push({
        title: data?.sf?.name!,
        animes: data?.sf?.animes,
        onSeeMoreCardPress: () =>
          statusListNavigation.navigate("InProgress", {
            status: AnimeViewStatus.InProgress
          })
      });

      setCardsLists(newCardsList);
      setHasListBeenPopulated(true);
    }
  }, [data, loading, homeNavigation, statusListNavigation]);

  if (
    (loading && networkStatus !== NetworkStatus.refetch) ||
    !hasListBeenPopulated
  )
    return (
      <View
        style={{
          marginTop: theme.spacing?.xl,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  return (
    <FlatList
      data={cardsLists}
      renderItem={({ item }) => <HomePreviewList {...item} />}
      keyExtractor={(item, index) => item.title + index}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <ListEmpty
          title={"Oups! \nIl n'y a rien à afficher ici."}
          subtitle={"(Vérifie ta connexion 👀)"}
        />
      }
      refreshing={loading && networkStatus === NetworkStatus.refetch}
      onRefresh={refetch}
    />
  );
};

export default HomeFlatPreviewList;

interface ListsScrollViewProps {}
