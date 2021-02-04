import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

import FacebookLogoSvg from "components/svg/FacebookLogoSvg";

const { width } = Dimensions.get("screen");

const FacebookAuthButton: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      type="outline"
      buttonStyle={{
        width: width * 0.8,
        height: 50,
        borderRadius: theme.borderRadii?.xxl,
        borderWidth: 2,
        borderColor: theme.colors?.primaryLighter
      }}
      disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
      containerStyle={{
        marginBottom: theme.spacing?.m
      }}
      titleStyle={{
        color: theme.colors?.white,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1
      }}
      icon={
        <View style={{ marginRight: theme.spacing?.m }}>
          <FacebookLogoSvg />
        </View>
      }
      title="Continuer avec Facebook"
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default FacebookAuthButton;
