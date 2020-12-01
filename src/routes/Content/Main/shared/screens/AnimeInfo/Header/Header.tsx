import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "components";
import { HomeNavigationProps } from "shared/navigation/NavigationProps";

const AnimeInfoHeader: React.FC<AnimeInfoHeaderProps> = ({
  hideBookmark = false
}: AnimeInfoHeaderProps) => {
  const navigation = useNavigation<
    HomeNavigationProps<"AnimeInfo">["navigation"]
  >();

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
              name={"bookmark-plus-outline"}
              size={40}
              color="white"
            />
          )
        }
      />
    </View>
  );
};

export default AnimeInfoHeader;

interface AnimeInfoHeaderProps {
  hideBookmark?: boolean;
}
