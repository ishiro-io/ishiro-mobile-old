import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";

const { height, width } = Dimensions.get("screen");

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
          height: height * 0.05,
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
            fontSize: 16
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
                fontSize: 16,
                marginRight: theme.spacing?.m,
                maxWidth: width * 0.5
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
              size={24}
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
