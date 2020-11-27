import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { Dimensions, Image, View } from "react-native";
import { Button, Text, ThemeContext } from "react-native-elements";

import { cache } from "shared/graphql";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

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
        containerStyle={{
          marginBottom: theme.spacing?.m
        }}
        titleStyle={{
          fontFamily: "Poppins_600SemiBold",
          color: theme.colors?.white,
          fontSize: 18,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 1
        }}
        onPress={() => navigation.navigate("Login")}
        title="Se connecter"
      />

      <Button
        type="solid"
        buttonStyle={{
          backgroundColor: theme.colors?.primaryLighter,
          width: width * 0.8,
          height: 50,
          borderRadius: theme.borderRadii?.xxl
        }}
        containerStyle={{
          marginBottom: theme.spacing?.m
        }}
        titleStyle={{
          color: theme.colors?.black,
          fontFamily: "Poppins_600SemiBold",
          fontSize: 18,
          textTransform: "uppercase",
          textAlign: "center",
          letterSpacing: 1
        }}
        onPress={() => navigation.navigate("SignUp")}
        title="S'inscrire"
      />
    </View>
  );
};

export default Onboarding;

interface OnboardingProps {}
