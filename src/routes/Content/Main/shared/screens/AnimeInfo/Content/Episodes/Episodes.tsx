import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { View } from "react-native";

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

  const [selectedArcIndex, setSelectedArcIndex] = useState<number>(0);

  const { arcs } = route.params.animeData;

  return (
    <View style={{ flex: 1 }}>
      {arcs.length && arcs.length > 1 ? (
        <ArcFlatList
          animeData={route.params.animeData}
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
          arcName={arcs[selectedArcIndex].title}
          isLastArc
        />
      )}
    </View>
  );
};

export default Episodes;

interface EpisodesProps {}
