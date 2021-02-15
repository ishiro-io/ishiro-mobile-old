import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

const AppleAuthButton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      type="outline"
      buttonStyle={{
        borderWidth: 2,
        borderColor: theme.colors?.primaryLighter
      }}
      disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
      containerStyle={{
        marginBottom: theme.spacing?.m
      }}
      titleStyle={{
        color: theme.colors?.white
      }}
      icon={
        <View style={{ marginRight: theme.spacing?.m }}>
          <AntDesign name="apple1" size={theme.textsize?.l} color="white" />
        </View>
      }
      title="Continuer avec Apple"
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default AppleAuthButton;
