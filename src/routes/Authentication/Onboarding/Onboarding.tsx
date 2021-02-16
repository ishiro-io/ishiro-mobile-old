import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Image, Platform, View } from "react-native";
import { Button, Text, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

import { cache } from "shared/graphql";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

import { AppleAuthButton } from "./AppleAuthButton";
import { FacebookAuthButton } from "./FacebookAuthButton";
import { GoogleAuthButton } from "./GoogleAuthButton";

const Onboarding: React.FC<OnboardingProps> = ({}: OnboardingProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"Onboarding">["navigation"]
  >();

  useEffect(() => {
    cache.reset();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Image
        source={require("../../../assets/images/logo.png")}
        style={{
          height: moderateScale(150),
          width: moderateScale(150),
          resizeMode: "cover",
          marginBottom: theme.spacing?.xxl
        }}
      />

      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: theme.textSize.l,
          color: theme.colors?.white,
          textAlign: "center",
          paddingHorizontal: theme.spacing?.xl,
          marginBottom: theme.spacing?.xxl
        }}
      >
        Des milliers d'animes que vous pouvez suivre à tout moment.
      </Text>

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
            <FontAwesome name="phone" size={moderateScale(20)} color="white" />
          </View>
        }
        onPress={() => navigation.navigate("AskConfirmPhoneNumberCode")}
        title="Continuer avec mon numéro"
      />

      <FacebookAuthButton />

      <GoogleAuthButton />

      {Platform.OS === "ios" && <AppleAuthButton />}
    </View>
  );
};

export default Onboarding;

interface OnboardingProps {}
