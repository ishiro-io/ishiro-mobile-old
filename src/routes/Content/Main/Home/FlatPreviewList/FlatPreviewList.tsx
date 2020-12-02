import { NetworkStatus } from "@apollo/client";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import { useCategoriesPreviewsQuery } from "shared/graphql/generated";

import HomePreviewList from "./HomePreviewList/HomePreviewList";

const HomeFlatPreviewList: React.FC<ListsScrollViewProps> = ({}: ListsScrollViewProps) => {
  const { theme } = useContext(ThemeContext);

  const { data, loading, refetch, networkStatus } = useCategoriesPreviewsQuery({
    notifyOnNetworkStatusChange: true
  });

  if (loading && networkStatus !== NetworkStatus.refetch)
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
      data={data?.categoriesPreviews}
      renderItem={({ item }) => <HomePreviewList categoryPreview={item} />}
      keyExtractor={(item) => item.categoryId!.toString()}
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
