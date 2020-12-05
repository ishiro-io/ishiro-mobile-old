import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { useArcsQuery } from "shared/graphql/generated";
import {
  AnimeInfoModalNavigationProps,
  AnimeInfoTabNavigationProps
} from "shared/navigation/NavigationProps";

import { ArcFlatList } from "./ArcFlatList";

const Episodes: React.FC<EpisodesProps> = ({}: EpisodesProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<AnimeInfoTabNavigationProps<"Episodes">["route"]>();
  const modalNavigation = useNavigation<
    AnimeInfoModalNavigationProps<"Main">["navigation"]
  >();

  const { data, loading } = useArcsQuery({
    variables: { animeId: route.params.animeId }
  });

  const [selectedArcIndex, setSelectedArcIndex] = useState<number>(0);

  if (loading)
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
    <View style={{ flex: 1 }}>
      {data?.arcs?.length && data.arcs.length > 1 ? (
        <ArcFlatList
          animeData={route.params.animeData}
          arcName={data.arcs[selectedArcIndex].title}
          isLastArc={selectedArcIndex === data.arcs.length - 1}
          displayHeaderArrow
          onHeaderArrowPress={() =>
            modalNavigation.navigate("ArcListModal", {
              arcList: data!.arcs!,
              selectedArcIndex,
              setSelectedArcIndex
            })
          }
          onNextEpisodePressed={
            selectedArcIndex < data!.arcs!.length - 1
              ? () => setSelectedArcIndex(selectedArcIndex + 1)
              : undefined
          }
        />
      ) : (
        <ArcFlatList animeData={route.params.animeData} isLastArc />
      )}
    </View>
  );
};

export default Episodes;

interface EpisodesProps {}
