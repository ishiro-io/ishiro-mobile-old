import { useRoute } from "@react-navigation/native";
import React from "react";

import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";

import { AnimeInfoHeader } from "../../Header";
import { AnimeInfoUpperImageContainer } from "./ImageContainer";

const AnimeInfoUpper: React.FC<AnimeInfoUpperProps> = ({}: AnimeInfoUpperProps) => {
  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const { animeData } = route.params;

  return (
    <>
      <AnimeInfoUpperImageContainer
        title={animeData!.title}
        titleJapanese={animeData!.titleJapanese}
        bannerImage={animeData!.bannerImage}
        episodeCount={animeData!.episodeCount}
      />

      <AnimeInfoHeader />
    </>
  );
};

export default AnimeInfoUpper;

interface AnimeInfoUpperProps {}
