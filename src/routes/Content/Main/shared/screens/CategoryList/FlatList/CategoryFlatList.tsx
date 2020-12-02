import { NetworkStatus } from "@apollo/client";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { ActivityIndicator, Dimensions, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { AnimeCard, ListEmpty } from "components";
import { useAnimesQuery } from "shared/graphql/generated";
import {
  HomeNavigationProps,
  SearchNavigationProps
} from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("window");

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

const CategoryFlatList: React.FC<CategoryFlatListProps> = ({}: CategoryFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    (
      | SearchNavigationProps<"CategoryList">
      | HomeNavigationProps<"CategoryList">
    )["route"]
  >();

  const navigation = useNavigation<
    (
      | SearchNavigationProps<"CategoryList">
      | HomeNavigationProps<"CategoryList">
    )["navigation"]
  >();

  const { data, loading, fetchMore, refetch, networkStatus } = useAnimesQuery({
    variables: {
      categoryId: route.params.categoryId,
      options: { limit: 20, offset: 0 }
    },
    notifyOnNetworkStatusChange: true
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
      data={data?.animes?.fields}
      renderItem={({ item }) => (
        <AnimeCard
          title={item.title}
          posterImageUrl={item.posterImage}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          // @ts-ignore
          onPress={() => navigation.navigate("AnimeInfo", { animeId: item.id })}
        />
      )}
      showsVerticalScrollIndicator={false}
      numColumns={Math.floor((width * 0.8) / CARD_WIDTH)}
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
