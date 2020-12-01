import React, { useContext } from "react";
import { View } from "react-native";
import { Button, IconNode, Text, ThemeContext } from "react-native-elements";
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
          <Button icon={iconLeft} type="clear" onPress={onIconLeftPress} />
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
          <Button icon={iconRight} type="clear" onPress={onIconRightPress} />
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
