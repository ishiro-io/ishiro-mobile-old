import { NetworkStatus } from "@apollo/client";
import { useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { AnimeCardWithBookmark, ListEmpty } from "components";
import { CARD_WIDTH } from "components/AnimeCardWithBookmark";
import { AnimeFieldsFragment, useAnimesQuery } from "shared/graphql/generated";
import {
  HomeNavigationProps,
  SearchNavigationProps
} from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("screen");

const CategoryFlatList: React.FC<CategoryFlatListProps> = ({}: CategoryFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    (
      | SearchNavigationProps<"CategoryList">
      | HomeNavigationProps<"CategoryList">
    )["route"]
  >();

  const { data, loading, fetchMore, refetch, networkStatus } = useAnimesQuery({
    variables: {
      categoryId: route.params.categoryId,
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
    networkStatus !== NetworkStatus.refetch &&
    networkStatus !== NetworkStatus.fetchMore
  )
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
    if (data?.animes?.hasMore && fetchMore) {
      fetchMore({
        variables: {
          options: { offset: data?.animes?.fields.length, limit: 20 }
        }
      });
    }
  };

  const buildFlatListData = () => {
    const { fields } = data?.animes;
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
      contentContainerStyle={{
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: theme.spacing?.m
      }}
      data={buildFlatListData()}
      renderItem={({ item }) => <AnimeCardWithBookmark animeData={item} />}
      showsVerticalScrollIndicator={false}
      key={numColumns}
      numColumns={numColumns}
      keyExtractor={(item) => item.id.toString()}
      onEndReachedThreshold={4}
      onEndReached={loadMoreAnimes}
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

export default CategoryFlatList;

interface CategoryFlatListProps {}
