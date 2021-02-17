import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

const SeeMoreCard: React.FC<SeeMoreCardProps> = ({
  onPress
}: SeeMoreCardProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width: moderateScale(125, 0.25),
          height: moderateVerticalScale(178.5, 0.25),
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
            fontSize: theme.textSize.s,
            color: theme.colors?.white,
            marginBottom: theme.spacing?.m
          }}
        >
          Voir plus
        </Text>
        <MaterialCommunityIcons
          name="plus-circle"
          size={moderateScale(24)}
          color="white"
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SeeMoreCard;

interface SeeMoreCardProps {
  onPress: () => void;
}
