import { NetworkStatus } from "@apollo/client";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

import { AnimeCardWithBookmark, ListEmpty } from "components";
import { CARD_WIDTH } from "components/AnimeCardWithBookmark";
import { useAnimesQuery } from "shared/graphql/generated";

const { width } = Dimensions.get("screen");

const SearchAll: React.FC<SearchAllProps> = ({}: SearchAllProps) => {
  const { theme } = useContext(ThemeContext);

  const { data, loading, fetchMore, refetch, networkStatus } = useAnimesQuery({
    variables: { options: { limit: 20, offset: 0 } },
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
    networkStatus !== NetworkStatus.refetch
  )
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

  const loadMoreAnimes = () => {
    if (data?.animes?.hasMore && fetchMore) {
      fetchMore({
        variables: {
          options: { offset: data?.animes?.fields.length, limit: 20 }
        }
      });
    }
  };

  return (
    <FlatList
      style={{
        flex: 1
      }}
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.spacing?.m
      }}
      data={data?.animes?.fields}
      renderItem={({ item }) => <AnimeCardWithBookmark animeData={item} />}
      showsVerticalScrollIndicator={false}
      key={numColumns}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={4}
      onEndReached={() => loadMoreAnimes()}
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

export default SearchAll;

interface SearchAllProps {}
