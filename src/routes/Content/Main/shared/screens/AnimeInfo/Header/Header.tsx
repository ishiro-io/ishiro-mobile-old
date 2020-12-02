import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "components";
import { AnimeViewingStatus } from "shared/graphql/generated";
import { useSetUserAnimeViewingStatus, useUpdateEffect } from "shared/hooks";
import {
  AnimeInfoModalNavigationProps,
  HomeNavigationProps
} from "shared/navigation/NavigationProps";

const AnimeInfoHeader: React.FC<AnimeInfoHeaderProps> = ({
  animeStatus,
  hideBookmark = false
}: AnimeInfoHeaderProps) => {
  const navigation = useNavigation<
    HomeNavigationProps<"AnimeInfo">["navigation"]
  >();

  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const setUserAnimeViewingStatus = useSetUserAnimeViewingStatus();

  const [isChecked, setIsChecked] = useState(
    animeStatus && animeStatus !== AnimeViewingStatus.None
  );
  const [isDirty, setIsDirty] = useState(false);

  // ? When animeStatus is updated, consolidate isChecked & clean isDirty
  useUpdateEffect(() => {
    setIsChecked(animeStatus !== AnimeViewingStatus.None);
    setIsDirty(false);
  }, [animeStatus]);

  // ? We call the mutation when the flag isDirty is true
  useUpdateEffect(() => {
    if (isDirty) {
      setUserAnimeViewingStatus({
        animeId: route.params.animeId,
        oldStatus: animeStatus || AnimeViewingStatus.None,
        newStatus: isChecked
          ? AnimeViewingStatus.ToSee
          : AnimeViewingStatus.None
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
  animeStatus?: AnimeViewingStatus;
  hideBookmark?: boolean;
}
