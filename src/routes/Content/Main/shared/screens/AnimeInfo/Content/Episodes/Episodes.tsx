import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";

import { useUserAnimeViewQuery } from "shared/graphql/generated";
import {
  AnimeInfoModalNavigationProps,
  AnimeInfoTabNavigationProps
} from "shared/navigation/NavigationProps";

import { ArcFlatList } from "./ArcFlatList";

const Episodes: React.FC<EpisodesProps> = ({}: EpisodesProps) => {
  const route = useRoute<AnimeInfoTabNavigationProps<"Episodes">["route"]>();
  const modalNavigation = useNavigation<
    AnimeInfoModalNavigationProps<"Main">["navigation"]
  >();

  const { data: animeViewData } = useUserAnimeViewQuery({
    variables: { animeId: route.params.animeId }
  });

  const { arcs } = route.params.animeData;

  const nextEpisodeArcIndex = arcs.findIndex(
    (arc) =>
      arc.title === animeViewData?.userAnimeView?.nextEpisodeToSee?.arcName
  );

  const lastEpisodeArcIndex = arcs.findIndex(
    (arc) =>
      arc.title === animeViewData?.userAnimeView?.lastEpisodeSeen?.arcName
  );

  const [selectedArcIndex, setSelectedArcIndex] = useState<number>(
    nextEpisodeArcIndex >= 0
      ? nextEpisodeArcIndex
      : lastEpisodeArcIndex >= 0
      ? lastEpisodeArcIndex
      : 0
  );

  return (
    <View style={{ flex: 1 }}>
      {arcs.length && arcs.length > 1 ? (
        <ArcFlatList
          animeData={route.params.animeData}
          animeViewData={animeViewData}
          arcName={arcs[selectedArcIndex].title}
          isLastArc={selectedArcIndex === arcs.length - 1}
          displayHeaderArrow
          onHeaderArrowPress={() =>
            modalNavigation.navigate("ArcListModal", {
              arcList: arcs,
              selectedArcIndex,
              setSelectedArcIndex
            })
          }
          onNextEpisodePressed={
            selectedArcIndex < arcs.length - 1
              ? () => setSelectedArcIndex(selectedArcIndex + 1)
              : undefined
          }
        />
      ) : (
        <ArcFlatList
          animeData={route.params.animeData}
          animeViewData={animeViewData}
          arcName={arcs[selectedArcIndex].title}
          isLastArc
        />
      )}
    </View>
  );
};

export default Episodes;

interface EpisodesProps {}
