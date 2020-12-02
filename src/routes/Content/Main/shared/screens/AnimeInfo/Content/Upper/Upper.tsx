import { useRoute } from "@react-navigation/native";
import React from "react";

import {
  AnimeViewingStatus,
  useUserAnimeViewingStatusQuery
} from "shared/graphql/generated";
import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";

import { AnimeInfoHeader } from "../../Header";
import { AnimeInfoUpperImageContainer } from "./ImageContainer";
import { AnimeStatusSelector } from "./StatusSelector";

const AnimeInfoUpper: React.FC<AnimeInfoUpperProps> = ({}: AnimeInfoUpperProps) => {
  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const { animeData } = route.params;

  const { data: statusData } = useUserAnimeViewingStatusQuery({
    variables: {
      animeId: route.params.animeId
    }
  });

  return (
    <>
      <AnimeInfoUpperImageContainer {...{ animeData }} />

      <AnimeInfoHeader animeStatus={statusData?.userAnimeViewingStatus} />

      {statusData?.userAnimeViewingStatus &&
        statusData?.userAnimeViewingStatus?.status !==
          AnimeViewingStatus.None && (
          <AnimeStatusSelector
            animeStatus={statusData?.userAnimeViewingStatus}
          />
        )}
    </>
  );
};

export default AnimeInfoUpper;

interface AnimeInfoUpperProps {}
