import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

import {
  AnimeFieldsFragment,
  AnimeViewStatus,
  useUserAnimeViewQuery
} from "shared/graphql/generated";
import { useSetUserAnimeViewStatus, useUpdateEffect } from "shared/hooks";
import { SearchNavigationProps } from "shared/navigation/NavigationProps";

import AnimeCard from "./AnimeCard";

export const CARD_WIDTH = moderateScale(145, 0.1);
const CARD_HEIGHT = moderateVerticalScale(250, 0.1);

const AnimeCardWithBookmark: React.FC<AnimeCardWithBookmarkProps> = ({
  animeData
}: AnimeCardWithBookmarkProps) => {
  const navigation = useNavigation<
    SearchNavigationProps<"Search" | "CategoryList">["navigation"]
  >();

  const { data, loading } = useUserAnimeViewQuery({
    variables: {
      animeId: animeData.id
    }
  });

  const setUserAnimeViewStatus = useSetUserAnimeViewStatus();

  const [isChecked, setIsChecked] = useState(
    data?.userAnimeView?.status &&
      data?.userAnimeView?.status !== AnimeViewStatus.None
  );
  const [isDirty, setIsDirty] = useState(false);

  // ? When status is updated, consolidate isChecked & clean isDirty
  useUpdateEffect(() => {
    setIsChecked(data?.userAnimeView?.status !== AnimeViewStatus.None);
    setIsDirty(false);
  }, [data?.userAnimeView?.status]);

  // ? We call the mutation when the flag isDirty is true
  useUpdateEffect(() => {
    if (isDirty && !loading) {
      setUserAnimeViewStatus({
        itemToUpdate: data?.userAnimeView ?? {
          id: 0,
          anime: animeData,
          status: AnimeViewStatus.None,
          episodeViews: [],
          lastEpisodeSeen: null,
          nextEpisodeToSee: null
        },
        newStatus: isChecked ? AnimeViewStatus.ToSee : AnimeViewStatus.None
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
            size={moderateScale(32)}
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
