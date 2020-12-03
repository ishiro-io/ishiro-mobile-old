import { NetworkStatus } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import {
  AnimeViewingStatus,
  useHomeAnimesQuery
} from "shared/graphql/generated";
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

      if (data?.userAnimesByViewingStatus.fields.length) {
        newCardsList.push({
          title: "En cours",
          animes: data.userAnimesByViewingStatus.fields.map((f) => {
            return { ...f.anime, nextEpisode: f.nextEpisodeToSee?.number };
          }),
          onSeeMoreCardPress: () =>
            statusListNavigation.navigate("InProgress", {
              status: AnimeViewingStatus.InProgress
            })
        });
      }

      if (data?.categoriesPreviews) {
        const previewsCards: HomePreviewListProps[] = data.categoriesPreviews.map(
          (cp) => {
            return {
              ...cp,
              onSeeMoreCardPress: () =>
                homeNavigation.navigate("CategoryList", {
                  categoryId: cp.categoryId!,
                  categoryName: cp.title
                })
            };
          }
        );
        newCardsList = [...newCardsList, ...previewsCards];
      }

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
