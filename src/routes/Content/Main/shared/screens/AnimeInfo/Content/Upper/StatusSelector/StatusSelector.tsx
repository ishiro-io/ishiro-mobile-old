import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { AnimeViewingStatus } from "shared/graphql/generated";

import { ChangeStatusButton } from "./ChangeStatusButton";

const { width } = Dimensions.get("screen");

const AnimeStatusSelector: React.FC<StatusSelectorProps> = ({
  status
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
              status === AnimeViewingStatus.ToSee
                ? theme.colors?.info
                : theme.colors?.grey5
            }
          />
        }
        status={AnimeViewingStatus.ToSee}
        oldStatus={status}
      />
      <ChangeStatusButton
        label="Je le regarde"
        icon={
          <MaterialIcons
            name="play-circle-filled"
            size={24}
            color={
              status === AnimeViewingStatus.InProgress
                ? theme.colors?.warning
                : theme.colors?.grey5
            }
          />
        }
        status={AnimeViewingStatus.InProgress}
        oldStatus={status}
      />
      <ChangeStatusButton
        label="Je l'ai terminé"
        icon={
          <MaterialIcons
            name="offline-pin"
            size={24}
            color={
              status === AnimeViewingStatus.Finished
                ? theme.colors?.success
                : theme.colors?.grey5
            }
          />
        }
        status={AnimeViewingStatus.Finished}
        oldStatus={status}
      />
      <ChangeStatusButton
        label="Je l'abandonne"
        icon={
          <MaterialIcons
            name="pause-circle-filled"
            size={24}
            color={
              status === AnimeViewingStatus.Abandoned
                ? theme.colors?.error
                : theme.colors?.grey5
            }
          />
        }
        status={AnimeViewingStatus.Abandoned}
        oldStatus={status}
      />
    </View>
  );
};

export default AnimeStatusSelector;

interface StatusSelectorProps {
  status: AnimeViewingStatus;
}
