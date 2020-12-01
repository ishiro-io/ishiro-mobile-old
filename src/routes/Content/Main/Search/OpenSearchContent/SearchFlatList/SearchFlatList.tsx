import { NetworkStatus } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import AnimeCard from "components/AnimeCard";
import { useSearchAnimesQuery } from "shared/graphql/generated";
import { SearchNavigationProps } from "shared/navigation/NavigationProps";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

const SearchFlatList: React.FC<SearchFlatListProps> = ({
  searchValue
}: SearchFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    SearchNavigationProps<"Search">["navigation"]
  >();

  const { data, loading, fetchMore, networkStatus } = useSearchAnimesQuery({
    variables: {
      input: { textSearchField: searchValue },
      options: { limit: 20, offset: 0 }
    },
    notifyOnNetworkStatusChange: true
  });

  if (loading && networkStatus !== NetworkStatus.fetchMore)
    return (
      <View
        style={{
          flex: 1,
          marginTop: theme.spacing?.xxl,
          justifyContent: "flex-start",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  const loadMoreAnimes = () => {
    if (data?.searchAnimes?.hasMore && fetchMore) {
      fetchMore({
        variables: {
          options: { offset: data?.searchAnimes?.fields.length, limit: 20 }
        }
      });
    }
  };

  return (
    <FlatList
      style={{
        flex: 1
      }}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: theme.spacing?.m
      }}
      data={data?.searchAnimes?.fields}
      renderItem={({ item }) => (
        <AnimeCard
          title={item.title}
          posterImageUrl={item.posterImage}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          onPress={() => navigation.navigate("AnimeInfo", { animeId: item.id })}
        />
      )}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={4}
      onEndReached={() => loadMoreAnimes()}
      ListEmptyComponent={
        <ListEmpty
          title={`Aucun résultat pour \n« ${searchValue} »`}
          subtitle={"Réessayez, vérifier l'orthographe de votre recherche"}
        />
      }
    />
  );
};

export default SearchFlatList;

interface SearchFlatListProps {
  searchValue: string;
}
