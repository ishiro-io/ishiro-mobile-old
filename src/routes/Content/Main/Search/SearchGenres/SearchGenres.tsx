import { NetworkStatus } from "@apollo/client";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { ListEmpty } from "components";
import { useCategoriesQuery } from "shared/graphql/generated";

import { GenreCard } from "./GenreCard";

const SearchGenres: React.FC<GenresProps> = ({}: GenresProps) => {
  const { theme } = useContext(ThemeContext);

  const { data, loading, networkStatus, refetch } = useCategoriesQuery({
    notifyOnNetworkStatusChange: true
  });

  if (loading && networkStatus !== NetworkStatus.refetch)
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
      showsVerticalScrollIndicator={false}
      data={data?.categories}
      renderItem={({ item }) => <GenreCard data={item} />}
      numColumns={2}
      keyExtractor={(item) => item.id.toString()}
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

export default SearchGenres;

interface GenresProps {}
