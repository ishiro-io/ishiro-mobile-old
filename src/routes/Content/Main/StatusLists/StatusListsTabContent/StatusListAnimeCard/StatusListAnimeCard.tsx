import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

import { AnimeCard } from "components";
import {
  AnimeViewStatus,
  UserAnimeViewFieldsFragment
} from "shared/graphql/generated";
import { useSetUserAnimeViewStatus } from "shared/hooks";
import { StatusListsTabNavigationProps } from "shared/navigation/NavigationProps";

export const CARD_WIDTH = moderateScale(160, 0.1);
const CARD_HEIGHT = moderateVerticalScale(260, 0.1);

type Option =
  | "Je veux regarder"
  | "Je regarde"
  | "J'ai terminé"
  | "J'abandonne"
  | "Annuler"
  | "Retirer de mes listes";

const StatusListAnimeCard: React.FC<StatusListAnimeCardProps> = ({
  item
}: StatusListAnimeCardProps) => {
  const navigation = useNavigation<
    StatusListsTabNavigationProps<
      "ToSee" | "Abandonned" | "Finished" | "InProgress"
    >["navigation"]
  >();

  const route = useRoute<
    StatusListsTabNavigationProps<
      "ToSee" | "Abandonned" | "Finished" | "InProgress"
    >["route"]
  >();

  const setUserAnimeViewStatus = useSetUserAnimeViewStatus();

  const { showActionSheetWithOptions } = useActionSheet();

  const onDotsPress = () => {
    const options: Option[] = [
      "Je veux regarder",
      "Je regarde",
      "J'ai terminé",
      "J'abandonne",
      "Annuler",
      "Retirer de mes listes"
    ];

    let filteredOptions: Option[] = options;
    switch (route.params.status) {
      case AnimeViewStatus.Abandoned:
        filteredOptions = options.filter((value) => value !== "J'abandonne");
        break;

      case AnimeViewStatus.Finished:
        filteredOptions = options.filter((value) => value !== "J'ai terminé");
        break;

      case AnimeViewStatus.InProgress:
        filteredOptions = options.filter((value) => value !== "Je regarde");
        break;

      case AnimeViewStatus.ToSee:
        filteredOptions = options.filter(
          (value) => value !== "Je veux regarder"
        );
        break;

      default:
        break;
    }

    showActionSheetWithOptions(
      {
        options: filteredOptions,
        showSeparators: true,
        cancelButtonIndex: 3,
        destructiveButtonIndex: 4
      },
      async (buttonIndex) => {
        const option = filteredOptions[buttonIndex];
        if (option === "Annuler") return;

        let newStatus: AnimeViewStatus;
        switch (option) {
          case "J'abandonne":
            newStatus = AnimeViewStatus.Abandoned;
            break;

          case "J'ai terminé":
            newStatus = AnimeViewStatus.Finished;
            break;

          case "Je regarde":
            newStatus = AnimeViewStatus.InProgress;
            break;

          case "Je veux regarder":
            newStatus = AnimeViewStatus.ToSee;
            break;

          case "Retirer de mes listes":
            newStatus = AnimeViewStatus.None;
            break;

          default:
            newStatus = AnimeViewStatus.ToSee;
            break;
        }

        await setUserAnimeViewStatus({
          itemToUpdate: item,
          newStatus
        });
      }
    );
  };

  const episodeText = (): string => {
    switch (item.status) {
      case AnimeViewStatus.InProgress:
        return "Prochain épisode";

      case AnimeViewStatus.Abandoned:
        return "Dernier épisode vu";

      default:
        return "";
    }
  };

  const episodeNumber = (): number | undefined => {
    switch (item.status) {
      case AnimeViewStatus.InProgress:
        return item.nextEpisodeToSee?.number;

      case AnimeViewStatus.Abandoned:
        return item.lastEpisodeSeen?.number;

      default:
        return undefined;
    }
  };

  return (
    <AnimeCard
      title={item.anime.title}
      posterImageUrl={item.anime.posterImage}
      episodeText={episodeText()}
      episodeNumber={episodeNumber()}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      onPress={() =>
        navigation.navigate("AnimeInfo", { animeId: item.anime.id })
      }
      topRightIcon={
        <MaterialCommunityIcons
          name="dots-vertical"
          size={moderateScale(32, 0.1)}
          color="white"
        />
      }
      onTopRightIconPress={onDotsPress}
    />
  );
};

export default StatusListAnimeCard;

interface StatusListAnimeCardProps {
  item: UserAnimeViewFieldsFragment;
}
