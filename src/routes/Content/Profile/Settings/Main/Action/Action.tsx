import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

const SettingsAction: React.FC<SettingsActionProps> = ({
  title,
  value,
  onPress,
  isDisabled = false
}: SettingsActionProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableHighlight onPress={onPress}>
      <View
        style={{
          backgroundColor: !isDisabled
            ? theme.colors?.grey8
            : theme.colors?.grey9,
          height: moderateVerticalScale(45),
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: theme.spacing?.m
        }}
      >
        <Text
          style={{
            color: !isDisabled ? theme.colors?.white : theme.colors?.grey8,
            fontFamily: "Poppins_400Regular",
            fontSize: theme.textSize.m
          }}
        >
          {title}
        </Text>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {value && (
            <Text
              style={{
                fontFamily: "Poppins_200ExtraLight",
                color: !isDisabled ? theme.colors?.grey2 : theme.colors?.grey8,
                fontSize: theme.textSize.m,
                marginRight: theme.spacing?.m
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {value}
            </Text>
          )}

          {onPress && !isDisabled && (
            <MaterialIcons
              name="keyboard-arrow-right"
              size={moderateScale(24)}
              color="white"
            />
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default SettingsAction;

export interface SettingsActionProps {
  title: string;
  value?: string | null;
  onPress?: () => void;
  isDisabled?: boolean;
}
