import React, { useContext } from "react";
import { View } from "react-native";
import { IconNode, Text, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Header: React.FC<HeaderProps> = ({
  label,
  iconLeft,
  iconRight,
  onIconLeftPress,
  onIconRightPress,
  justifyContent = "space-between",
  height = 80
}: HeaderProps) => {
  const { theme } = useContext(ThemeContext);
  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        height,
        paddingHorizontal: theme.spacing?.m,
        marginTop: top
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent
        }}
      >
        {iconLeft ? (
          <TouchableWithoutFeedback onPress={onIconLeftPress}>
            {iconLeft}
          </TouchableWithoutFeedback>
        ) : iconRight ? (
          <View style={{ width: 32, height: 32 }} />
        ) : (
          <></>
        )}

        {label && (
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
              color: theme.colors?.white
            }}
          >
            {label}
          </Text>
        )}

        {iconRight ? (
          <TouchableWithoutFeedback onPress={onIconRightPress}>
            {iconRight}
          </TouchableWithoutFeedback>
        ) : iconLeft ? (
          <View style={{ width: 32, height: 32 }} />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default Header;

interface HeaderProps {
  label?: string;
  iconLeft?: IconNode;
  onIconLeftPress?: () => void;
  iconRight?: IconNode;
  onIconRightPress?: () => void;
  height?: number;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly"
    | undefined;
}
