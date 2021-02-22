import { NetworkStatus } from "@apollo/client";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { AnimeCardWithBookmark, ListEmpty } from "components";
import { CARD_WIDTH } from "components/AnimeCardWithBookmark";
import {
  AnimeFieldsFragment,
  useSearchAnimesQuery
} from "shared/graphql/generated";

const { width } = Dimensions.get("screen");

const SearchFlatList: React.FC<SearchFlatListProps> = ({
  searchValue
}: SearchFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const { data, loading, fetchMore, networkStatus } = useSearchAnimesQuery({
    variables: {
      input: { textSearchField: searchValue },
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

  const buildFlatListData = () => {
    const { fields } = data?.searchAnimes;
    const array: Array<AnimeFieldsFragment & { blank?: boolean }> = [...fields];
    const numberOfFullRows = Math.floor(fields.length / numColumns);

    let numberOfElementsLastRow = fields.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      array.push({
        blank: true,
        id: numberOfElementsLastRow,
        title: undefined
      });
      numberOfElementsLastRow++;
    }

    return array;
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
      data={buildFlatListData()}
      renderItem={({ item }) => <AnimeCardWithBookmark animeData={item} />}
      showsVerticalScrollIndicator={false}
      numColumns={numColumns}
      key={numColumns}
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
