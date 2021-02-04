import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import {
  AnimeViewStatus,
  UserAnimeViewFieldsFragment
} from "shared/graphql/generated";
import { useSetUserAnimeViewStatus } from "shared/hooks";

const ChangeStatusButton: React.FC<ChangeStatusButtonProps> = ({
  label,
  icon,
  animeStatus,
  newStatus
}: ChangeStatusButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const setUserAnimeView = useSetUserAnimeViewStatus();

  const onPress = () => {
    setUserAnimeView({
      itemToUpdate: animeStatus,
      newStatus:
        newStatus !== animeStatus.status ? newStatus : AnimeViewStatus.ToSee
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
  animeStatus: UserAnimeViewFieldsFragment;
  newStatus: AnimeViewStatus;
}
