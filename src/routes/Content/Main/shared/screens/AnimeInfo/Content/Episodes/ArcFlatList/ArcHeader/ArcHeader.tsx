import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";

const { width } = Dimensions.get("screen");

const ArcHeader: React.FC<StickyHeaderProps> = ({
  arcName,
  onArrowPress,
  displayArrow = false,
  onCheckPress,
  maxCount,
  checkedCount,
  isChecked
}: StickyHeaderProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors?.black,
        paddingHorizontal: theme.spacing?.m,
        paddingVertical: theme.spacing?.m,
        borderBottomWidth: 2,
        borderColor: theme.colors?.grey8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          if (onArrowPress) onArrowPress();
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: moderateScale(260)
          }}
        >
          {displayArrow && (
            <MaterialIcons
              name="keyboard-arrow-down"
              size={moderateScale(24, 0.1)}
              color="white"
            />
          )}
          <View>
            <Text
              style={{
                fontFamily: "Poppins_700Bold",
                fontSize: theme.textSize.m,
                paddingLeft: theme.spacing?.m
              }}
            >
              {arcName || "Episodes"}
            </Text>

            <Text
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: theme.textSize.s,
                paddingLeft: theme.spacing?.m
              }}
            >
              {`${checkedCount} / ${maxCount} épisodes vus`}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => onCheckPress(!isChecked)}>
        <MaterialCommunityIcons
          name="checkbox-multiple-marked-circle-outline"
          size={moderateScale(30, 0.1)}
          color={isChecked ? theme.colors?.success : theme.colors?.grey6}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default ArcHeader;

interface StickyHeaderProps {
  arcName?: string;
  onArrowPress?: () => void;
  displayArrow?: boolean;
  onCheckPress: (toSeen: boolean) => void;
  maxCount: number;
  checkedCount: number;
  isChecked: boolean;
}
