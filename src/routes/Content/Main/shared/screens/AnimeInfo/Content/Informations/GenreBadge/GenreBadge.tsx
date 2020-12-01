import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

import { GenreIcon } from "components";

const GenreBadge: React.FC<GenreBadgeProps> = ({ name }: GenreBadgeProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        backgroundColor: theme.colors?.grey8,
        height: 25,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderRadius: theme.borderRadii?.xs,
        marginRight: theme.spacing?.s,
        paddingHorizontal: theme.spacing?.s
      }}
    >
      <GenreIcon name={name} size={16} />
      <Text
        style={{
          marginLeft: theme.spacing?.m
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
