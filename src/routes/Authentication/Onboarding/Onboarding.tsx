import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import { Button, Text, ThemeContext } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

import { cache } from "shared/graphql";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

import { GoogleAuthButton } from "./GoogleAuthButton";

const { width } = Dimensions.get("screen");

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
          height: RFPercentage(25),
          width: RFPercentage(25),
          resizeMode: "cover",
          marginBottom: theme.spacing?.xl
        }}
      />

      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: theme.textsize.l,
          color: theme.colors?.white,
          textAlign: "center",
          paddingHorizontal: theme.spacing?.xl,
          marginBottom: theme.spacing?.xl,
          maxWidth: 700
        }}
      >
        Des milliers d'animes que vous pouvez suivre à tout moment.
      </Text>

      <Button
        type="outline"
        buttonStyle={{
          width: width * 0.9,
          borderWidth: 2,
          borderColor: theme.colors?.primaryLighter
        }}
        disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
        titleStyle={{
          color: theme.colors?.white
        }}
        icon={
          <View style={{ marginRight: theme.spacing?.m }}>
            <FontAwesome name="phone" size={theme.textsize?.l} color="white" />
          </View>
        }
        onPress={() => navigation.navigate("AskConfirmPhoneNumberCode")}
        title="Continuer avec mon numéro"
      />

      {/* <FacebookAuthButton /> */}

      <GoogleAuthButton />

      {/* {Platform.OS === "ios" && <AppleAuthButton />} */}
    </View>
  );
};

export default Onboarding;

interface OnboardingProps {}
