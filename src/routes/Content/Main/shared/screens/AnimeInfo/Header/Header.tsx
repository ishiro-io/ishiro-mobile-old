import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "components";
import {
  AnimeDataFieldsFragment,
  AnimeViewStatus,
  UserAnimeViewFieldsFragment
} from "shared/graphql/generated";
import { useSetUserAnimeViewStatus, useUpdateEffect } from "shared/hooks";
import { HomeNavigationProps } from "shared/navigation/NavigationProps";

const AnimeInfoHeader: React.FC<AnimeInfoHeaderProps> = ({
  animeData,
  animeStatus,
  hideBookmark = false
}: AnimeInfoHeaderProps) => {
  const navigation = useNavigation<
    HomeNavigationProps<"AnimeInfo">["navigation"]
  >();

  const setUserAnimeViewStatus = useSetUserAnimeViewStatus();

  const [isChecked, setIsChecked] = useState(
    animeStatus?.status && animeStatus?.status !== AnimeViewStatus.None
  );
  const [isDirty, setIsDirty] = useState(false);

  // ? When animeStatus?.status is updated, consolidate isChecked & clean isDirty
  useUpdateEffect(() => {
    setIsChecked(animeStatus?.status !== AnimeViewStatus.None);
    setIsDirty(false);
  }, [animeStatus?.status]);

  // ? We call the mutation when the flag isDirty is true
  useUpdateEffect(() => {
    if (isDirty) {
      setUserAnimeViewStatus({
        itemToUpdate: animeStatus ?? {
          id: 0,
          anime: animeData!,
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
  const onPress = () => {
    if (isDirty) return;

    setIsChecked((prev) => !prev);
    setIsDirty(true);
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <Header
        height={60}
        iconLeft={
          <MaterialIcons name="keyboard-arrow-left" size={40} color="white" />
        }
        onIconLeftPress={() => navigation.goBack()}
        iconRight={
          !hideBookmark && (
            <MaterialCommunityIcons
              name={isChecked ? "bookmark" : "bookmark-plus-outline"}
              size={40}
              color="white"
            />
          )
        }
        onIconRightPress={onPress}
      />
    </View>
  );
};

export default AnimeInfoHeader;

interface AnimeInfoHeaderProps {
  animeData?: AnimeDataFieldsFragment;
  animeStatus?: UserAnimeViewFieldsFragment;
  hideBookmark?: boolean;
}
