import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

const ListEmpty: React.FC<ListEmptyProps> = ({
  title,
  subtitle
}: ListEmptyProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        marginTop: theme.spacing?.xl,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text style={{ fontSize: 30, marginBottom: theme.spacing?.m }}>😧</Text>
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Poppins_500Medium",
          textAlign: "center",
          marginBottom: theme.spacing?.s
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          fontFamily: "Poppins_300Light",
          marginHorizontal: theme.spacing?.m
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default ListEmpty;

interface ListEmptyProps {
  title: string;
  subtitle: string;
}
