import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { HomeNavigationProps } from "shared/navigation/NavigationProps";

const SeeMoreCard: React.FC<SeeMoreCardProps> = ({
  categoryName,
  categoryId
}: SeeMoreCardProps) => {
  const { theme } = useContext(ThemeContext);
  //Gère la navigation pour retourner en arrière
  const navigation = useNavigation<HomeNavigationProps<"Home">["navigation"]>();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("CategoryList", { categoryId, categoryName })
      }
    >
      <View
        style={{
          width: 125,
          height: 178.5,
          margin: theme.spacing?.s,
          backgroundColor: theme.colors?.grey9,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.borderRadii?.m
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: 13,
            color: theme.colors?.white,
            marginBottom: theme.spacing?.m
          }}
        >
          Voir plus
        </Text>
        <MaterialCommunityIcons name="plus-circle" size={24} color="white" />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SeeMoreCard;

interface SeeMoreCardProps {
  categoryId: number;
  categoryName: string;
}
