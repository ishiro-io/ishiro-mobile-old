import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import {
  AnimeFieldsFragment,
  AnimeViewingStatus,
  useUserAnimeViewingStatusQuery
} from "shared/graphql/generated";
import { useSetUserAnimeViewingStatus, useUpdateEffect } from "shared/hooks";
import { SearchNavigationProps } from "shared/navigation/NavigationProps";

import AnimeCard from "./AnimeCard";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

const AnimeCardWithBookmark: React.FC<AnimeCardWithBookmarkProps> = ({
  animeData
}: AnimeCardWithBookmarkProps) => {
  const navigation = useNavigation<
    SearchNavigationProps<"Search" | "CategoryList">["navigation"]
  >();

  const { data, loading } = useUserAnimeViewingStatusQuery({
    variables: {
      animeId: animeData.id
    }
  });

  const setUserAnimeViewingStatus = useSetUserAnimeViewingStatus();

  const [isChecked, setIsChecked] = useState(
    data?.userAnimeViewingStatus?.status &&
      data?.userAnimeViewingStatus?.status !== AnimeViewingStatus.None
  );
  const [isDirty, setIsDirty] = useState(false);

  // ? When status is updated, consolidate isChecked & clean isDirty
  useUpdateEffect(() => {
    setIsChecked(
      data?.userAnimeViewingStatus?.status !== AnimeViewingStatus.None
    );
    setIsDirty(false);
  }, [data?.userAnimeViewingStatus?.status]);

  // ? We call the mutation when the flag isDirty is true
  useUpdateEffect(() => {
    if (isDirty && !loading) {
      setUserAnimeViewingStatus({
        itemToUpdate: data?.userAnimeViewingStatus! ?? {
          id: 0,
          anime: animeData,
          status: AnimeViewingStatus.None,
          episodesStatus: [],
          lastEpisodeSeen: null,
          nextEpisodeToSee: null
        },
        newStatus: isChecked
          ? AnimeViewingStatus.ToSee
          : AnimeViewingStatus.None
      });
    }

    setIsDirty(false);
  }, [isDirty]);

  // ? Check the icon, and tell the component to call the mutation
  const onBookmarkPress = () => {
    if (isDirty || loading) return;

    setIsChecked((prev) => !prev);
    setIsDirty(true);
  };

  return (
    <AnimeCard
      title={animeData.title}
      posterImageUrl={animeData.posterImage}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      onPress={() =>
        navigation.navigate("AnimeInfo", { animeId: animeData.id })
      }
      topRightIcon={
        !loading && (
          <MaterialCommunityIcons
            name={isChecked ? "bookmark" : "bookmark-plus-outline"}
            size={32}
            color="white"
          />
        )
      }
      onTopRightIconPress={onBookmarkPress}
    />
  );
};

export default AnimeCardWithBookmark;

interface AnimeCardWithBookmarkProps {
  animeData: AnimeFieldsFragment;
}
