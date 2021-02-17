import { NetworkStatus } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import { useUserAnimeViewsByStatusQuery } from "shared/graphql/generated";
import { StatusListsTabNavigationProps } from "shared/navigation/NavigationProps";

import { CARD_WIDTH, StatusListAnimeCard } from "./StatusListAnimeCard";

const { width } = Dimensions.get("screen");

const StatusListsTabContent: React.FC<StatusListsTabContentProps> = ({}: StatusListsTabContentProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    StatusListsTabNavigationProps<
      "ToSee" | "Abandonned" | "Finished" | "InProgress"
    >["route"]
  >();

  const {
    data,
    loading,
    fetchMore,
    refetch,
    networkStatus
  } = useUserAnimeViewsByStatusQuery({
    variables: {
      status: route.params.status,
      options: { limit: 20, offset: 0 }
    },
    notifyOnNetworkStatusChange: true
  });

  const [numColumns, setNumColumns] = useState(
    Math.floor(width / (CARD_WIDTH * 1.1))
  );

  Dimensions.addEventListener("change", ({ screen }) => {
    const num = Math.floor(screen.width / (CARD_WIDTH * 1.1));

    setNumColumns(num);
  });

  if (
    loading &&
    networkStatus !== NetworkStatus.fetchMore &&
    (networkStatus === NetworkStatus.refetch ||
      networkStatus === NetworkStatus.loading)
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
    if (data?.userAnimeViewsByStatus?.hasMore && fetchMore) {
      fetchMore({
        variables: {
          options: {
            offset: data?.userAnimeViewsByStatus?.fields.length,
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
      data={data?.userAnimeViewsByStatus?.fields}
      renderItem={({ item }) => <StatusListAnimeCard {...{ item }} />}
      showsVerticalScrollIndicator={false}
      key={numColumns}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={4}
      onEndReached={() => loadMoreUserAnimes()}
      ListEmptyComponent={
        <ListEmpty
          title={"Cette liste est vide..."}
          subtitle={"Ca serait mieux avec des animes non ?"}
        />
      }
      refreshing={loading && networkStatus === NetworkStatus.refetch}
      onRefresh={refetch}
    />
  );
};

export default StatusListsTabContent;

interface StatusListsTabContentProps {}
