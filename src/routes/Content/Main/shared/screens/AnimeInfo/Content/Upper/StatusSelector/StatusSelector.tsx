import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import {
  AnimeViewingStatus,
  UserAnimeStatusFieldsFragment
} from "shared/graphql/generated";

import { ChangeStatusButton } from "./ChangeStatusButton";

const { width } = Dimensions.get("screen");

const AnimeStatusSelector: React.FC<StatusSelectorProps> = ({
  animeStatus
}: StatusSelectorProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        paddingTop: theme.spacing?.s,
        paddingBottom: theme.spacing?.m,
        flexDirection: "row",
        width,
        justifyContent: "space-around"
      }}
    >
      <ChangeStatusButton
        label="Je veux le voir"
        icon={
          <MaterialIcons
            name="watch-later"
            size={24}
            color={
              animeStatus?.status === AnimeViewingStatus.ToSee
                ? theme.colors?.info
                : theme.colors?.grey5
            }
          />
        }
        newStatus={AnimeViewingStatus.ToSee}
        {...{ animeStatus }}
      />
      <ChangeStatusButton
        label="Je le regarde"
        icon={
          <MaterialIcons
            name="play-circle-filled"
            size={24}
            color={
              animeStatus?.status === AnimeViewingStatus.InProgress
                ? theme.colors?.warning
                : theme.colors?.grey5
            }
          />
        }
        newStatus={AnimeViewingStatus.InProgress}
        {...{ animeStatus }}
      />
      <ChangeStatusButton
        label="Je l'ai terminé"
        icon={
          <MaterialIcons
            name="offline-pin"
            size={24}
            color={
              animeStatus?.status === AnimeViewingStatus.Finished
                ? theme.colors?.success
                : theme.colors?.grey5
            }
          />
        }
        newStatus={AnimeViewingStatus.Finished}
        {...{ animeStatus }}
      />
      <ChangeStatusButton
        label="Je l'abandonne"
        icon={
          <MaterialIcons
            name="pause-circle-filled"
            size={24}
            color={
              animeStatus?.status === AnimeViewingStatus.Abandoned
                ? theme.colors?.error
                : theme.colors?.grey5
            }
          />
        }
        newStatus={AnimeViewingStatus.Abandoned}
        {...{ animeStatus }}
      />
    </View>
  );
};

export default AnimeStatusSelector;

interface StatusSelectorProps {
  animeStatus: UserAnimeStatusFieldsFragment;
}
