import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

const { width } = Dimensions.get("screen");

const Row: React.FC<RowProps> = ({ title, data }: RowProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: theme.spacing?.s
      }}
    >
      <View
        style={{
          width: width * 0.45,
          justifyContent: "center"
        }}
      >
        <Text style={{ fontFamily: "Poppins_500Medium" }}>{title}</Text>
      </View>
      <View
        style={{
          width: width * 0.45,
          justifyContent: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_200ExtraLight"
          }}
        >
          {data}
        </Text>
      </View>
    </View>
  );
};

export default Row;

interface RowProps {
  title: string;
  data: string;
}
