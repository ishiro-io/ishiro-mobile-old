import React, { ReactElement, useContext } from "react";
import { Dimensions, Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

import { SettingsActionProps } from "../Action/Action";

const { width } = Dimensions.get("screen");

const SettingsGroup: React.FC<SettingsGroupProps> = ({
  title,
  children
}: SettingsGroupProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        width,
        marginBottom: theme.spacing?.m
      }}
    >
      <Text
        style={{
          color: theme.colors?.primaryLighter,
          fontFamily: "Poppins_500Medium",
          fontSize: RFValue(18),
          textTransform: "uppercase",
          marginBottom: theme.spacing?.m,
          marginLeft: theme.spacing?.l
        }}
      >
        {title}
      </Text>
      {children}
    </View>
  );
};

export default SettingsGroup;

interface SettingsGroupProps {
  title: string;
  children:
    | ReactElement<SettingsActionProps>
    | ReactElement<SettingsActionProps>[];
}
