import { NetworkStatus } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

import { AnimeCard, AnimeCardWithBookmark, ListEmpty } from "components";
import { useAnimesQuery } from "shared/graphql/generated";
import { SearchTabNavigationProps } from "shared/navigation/NavigationProps";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

const SearchAll: React.FC<SearchAllProps> = ({}: SearchAllProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    SearchTabNavigationProps<"Tous">["navigation"]
  >();

  const { data, loading, fetchMore, refetch, networkStatus } = useAnimesQuery({
    variables: { options: { limit: 20, offset: 0 } },
    notifyOnNetworkStatusChange: true
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
      numColumns={2}
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
