import { AntDesign } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

const AppleAuthButton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      type="outline"
      buttonStyle={{
        borderColor: theme.colors?.primaryLighter,
        borderWidth: moderateScale(2, 0.25)
      }}
      disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
      containerStyle={{
        marginBottom: theme.spacing.s
      }}
      titleStyle={{
        color: theme.colors?.white
      }}
      icon={
        <View style={{ marginRight: theme.spacing?.m }}>
          <AntDesign name="apple1" size={moderateScale(20)} color="white" />
        </View>
      }
      title="Continuer avec Apple"
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default AppleAuthButton;
