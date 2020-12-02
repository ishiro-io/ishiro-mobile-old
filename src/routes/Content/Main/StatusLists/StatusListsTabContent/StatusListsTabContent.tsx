import { NetworkStatus } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import AnimeCard from "components/AnimeCard";
import { useUserAnimesByViewingStatusQuery } from "shared/graphql/generated";
import { StatusListsTabNavigationProps } from "shared/navigation/NavigationProps";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

const StatusListsTabContent: React.FC<StatusListsTabContentProps> = ({}: StatusListsTabContentProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    StatusListsTabNavigationProps<
      "ToSee" | "Abandonned" | "Finished" | "InProgress"
    >["route"]
  >();

  const navigation = useNavigation<
    StatusListsTabNavigationProps<
      "ToSee" | "Abandonned" | "Finished" | "InProgress"
    >["navigation"]
  >();

  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus
  } = useUserAnimesByViewingStatusQuery({
    variables: {
      status: route.params.status,
      options: { limit: 20, offset: 0 }
    },
    notifyOnNetworkStatusChange: true
  });

  if (
    loading &&
    networkStatus !== NetworkStatus.fetchMore &&
    networkStatus === NetworkStatus.refetch
  )
    return (
      <View
        style={{
          flex: 1,
          paddingTop: theme.spacing?.xxl,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  const loadMoreUserAnimes = () => {
    if (data?.userAnimesByViewingStatus?.hasMore && fetchMore) {
      fetchMore({
        variables: {
          options: {
            offset: data?.userAnimesByViewingStatus?.fields.length,
            limit: 20
          }
        }
      });
    }
  };

  return (
    <FlatList
      style={{
        backgroundColor: theme.colors?.black,
        flex: 1
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.spacing?.m
      }}
      data={data?.userAnimesByViewingStatus?.fields}
      renderItem={({ item }) => (
        <AnimeCard
          title={item.anime.title}
          posterImageUrl={item.anime.posterImage}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          onPress={() => navigation.navigate("AnimeInfo", { animeId: item.id })}
        />
      )}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={4}
      onEndReached={() => loadMoreUserAnimes()}
      ListEmptyComponent={
        <ListEmpty
          title={"Cette liste est vide..."}
          subtitle={"Ca serait même mieux avec des animes non ?"}
        />
      }
      refreshing={loading && networkStatus === NetworkStatus.refetch}
      onRefresh={refetch}
    />
  );
};

export default StatusListsTabContent;

interface StatusListsTabContentProps {}
