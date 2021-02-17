import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

import { GenreIcon } from "components";

const GenreBadge: React.FC<GenreBadgeProps> = ({ name }: GenreBadgeProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors?.grey8,
        height: moderateVerticalScale(20),
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: theme.borderRadii?.xs,
        marginRight: theme.spacing?.s,
        paddingHorizontal: theme.spacing?.s
      }}
    >
      <GenreIcon name={name} size={moderateScale(14, 0.05)} />
      <Text
        style={{
          marginLeft: theme.spacing?.m,
          fontSize: theme.textSize.s
        }}
      >
        {name}
      </Text>
    </View>
  );
};

export default GenreBadge;

interface GenreBadgeProps {
  name: string;
}
