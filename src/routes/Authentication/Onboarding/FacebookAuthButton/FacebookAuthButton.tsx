import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

import FacebookLogoSvg from "components/svg/FacebookLogoSvg";

const FacebookAuthButton: React.FC = () => {
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
          <FacebookLogoSvg
            width={theme.textsize?.l}
            height={theme.textsize?.l}
          />
        </View>
      }
      title="Continuer avec Facebook"
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default FacebookAuthButton;
