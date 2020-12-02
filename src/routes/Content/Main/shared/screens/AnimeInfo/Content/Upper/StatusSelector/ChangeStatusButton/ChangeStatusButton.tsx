import { useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { AnimeViewingStatus } from "shared/graphql/generated";
import { useSetUserAnimeViewingStatus } from "shared/hooks";
import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";

const ChangeStatusButton: React.FC<ChangeStatusButtonProps> = ({
  label,
  icon,
  status,
  oldStatus
}: ChangeStatusButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<AnimeInfoModalNavigationProps<"Main">["route"]>();

  const setUserAnimeViewingStatus = useSetUserAnimeViewingStatus();

  const onPress = () => {
    setUserAnimeViewingStatus({
      animeId: route.params.animeId,
      oldStatus,
      newStatus: status !== oldStatus ? status : AnimeViewingStatus.ToSee
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
  status: AnimeViewingStatus;
  oldStatus: AnimeViewingStatus;
}
