import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

const IdentifierInputLabel: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        marginBottom: theme.spacing?.s
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 18,
          color: theme.colors?.white
        }}
      >
        Numéro de téléphone
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_300Light",
          fontSize: 18,
          color: theme.colors?.white
        }}
      >
        {" "}
        ou{" "}
      </Text>
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 18,
          color: theme.colors?.white
        }}
      >
        nom d'utilisateur
      </Text>
    </View>
  );
};

export default IdentifierInputLabel;
