import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import {
  AnimeViewingStatus,
  UserAnimeStatusFieldsFragment
} from "shared/graphql/generated";
import { useSetUserAnimeViewingStatus } from "shared/hooks";

const ChangeStatusButton: React.FC<ChangeStatusButtonProps> = ({
  label,
  icon,
  animeStatus,
  newStatus
}: ChangeStatusButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const setUserAnimeViewingStatus = useSetUserAnimeViewingStatus();

  const onPress = () => {
    setUserAnimeViewingStatus({
      itemToUpdate: animeStatus,
      newStatus:
        newStatus !== animeStatus.status ? newStatus : AnimeViewingStatus.ToSee
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          paddingHorizontal: theme.spacing?.m,
          alignItems: "center"
        }}
      >
        {icon}
        <Text
          style={{
            color: theme.colors?.grey5,
            fontFamily: "Poppins_300Light",
            fontSize: 11,
            paddingTop: theme.spacing?.s
          }}
        >
          {label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ChangeStatusButton;

interface ChangeStatusButtonProps {
  label: string;
  icon: React.ReactElement;
  animeStatus: UserAnimeStatusFieldsFragment;
  newStatus: AnimeViewingStatus;
}
