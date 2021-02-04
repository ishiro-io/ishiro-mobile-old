import { useRoute } from "@react-navigation/native";
import React from "react";

import {
  AnimeViewStatus,
  useUserAnimeViewQuery
} from "shared/graphql/generated";
import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";

import { AnimeInfoHeader } from "../../Header";
import { AnimeInfoUpperImageContainer } from "./ImageContainer";
import { AnimeStatusSelector } from "./StatusSelector";

const AnimeInfoUpper: React.FC<AnimeInfoUpperProps> = ({}: AnimeInfoUpperProps) => {
  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const { animeData } = route.params;

  const { data } = useUserAnimeViewQuery({
    variables: {
      animeId: route.params.animeId
    }
  });

  return (
    <>
      <AnimeInfoUpperImageContainer {...{ animeData }} />

      <AnimeInfoHeader animeStatus={data?.userAnimeView} {...{ animeData }} />

      {data?.userAnimeView &&
        data?.userAnimeView?.status !== AnimeViewStatus.None && (
          <AnimeStatusSelector animeView={data?.userAnimeView} />
        )}
    </>
  );
};

export default AnimeInfoUpper;

interface AnimeInfoUpperProps {}
