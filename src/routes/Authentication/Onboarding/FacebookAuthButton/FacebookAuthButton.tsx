import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

import FacebookLogoSvg from "components/svg/FacebookLogoSvg";

const FacebookAuthButton: React.FC = () => {
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
          <FacebookLogoSvg />
        </View>
      }
      title="Continuer avec Facebook"
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default FacebookAuthButton;
