import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import { Button, Text, ThemeContext } from "react-native-elements";

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
          height: 200,
          width: 200,
          resizeMode: "cover",
          marginBottom: theme.spacing?.xxl
        }}
      />

      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 24,
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
            <FontAwesome name="phone" size={24} color="white" />
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
