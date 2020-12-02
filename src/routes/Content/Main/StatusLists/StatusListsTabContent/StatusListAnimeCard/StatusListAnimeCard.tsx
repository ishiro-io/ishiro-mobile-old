import { useActionSheet } from "@expo/react-native-action-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";

import { AnimeCard } from "components";
import {
  AnimeViewingStatus,
  UserAnimeStatusFieldsFragment
} from "shared/graphql/generated";
import { useSetUserAnimeViewingStatus } from "shared/hooks";
import { StatusListsTabNavigationProps } from "shared/navigation/NavigationProps";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 260;

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

  const setUserAnimeViewingStatus = useSetUserAnimeViewingStatus();

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
      case AnimeViewingStatus.Abandoned:
        filteredOptions = options.filter((value) => value !== "J'abandonne");
        break;

      case AnimeViewingStatus.Finished:
        filteredOptions = options.filter((value) => value !== "J'ai terminé");
        break;

      case AnimeViewingStatus.InProgress:
        filteredOptions = options.filter((value) => value !== "Je regarde");
        break;

      case AnimeViewingStatus.ToSee:
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

        let newStatus: AnimeViewingStatus;
        switch (option) {
          case "J'abandonne":
            newStatus = AnimeViewingStatus.Abandoned;
            break;

          case "J'ai terminé":
            newStatus = AnimeViewingStatus.Finished;
            break;

          case "Je regarde":
            newStatus = AnimeViewingStatus.InProgress;
            break;

          case "Je veux regarder":
            newStatus = AnimeViewingStatus.ToSee;
            break;

          case "Retirer de mes listes":
            newStatus = AnimeViewingStatus.None;
            break;

          default:
            newStatus = AnimeViewingStatus.ToSee;
            break;
        }

        await setUserAnimeViewingStatus({
          itemToUpdate: item,
          newStatus
        });
      }
    );
  };

  return (
    <AnimeCard
      title={item.anime.title}
      posterImageUrl={item.anime.posterImage}
      width={CARD_WIDTH}
      height={CARD_HEIGHT}
      onPress={() =>
        navigation.navigate("AnimeInfo", { animeId: item.anime.id })
      }
      topRightIcon={
        <MaterialCommunityIcons name="dots-vertical" size={32} color="white" />
      }
      onTopRightIconPress={onDotsPress}
    />
  );
};

export default StatusListAnimeCard;

interface StatusListAnimeCardProps {
  item: UserAnimeStatusFieldsFragment;
}
