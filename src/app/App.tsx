import { ApolloProvider } from "@apollo/client";
import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts
} from "@expo-google-fonts/poppins";
import { AppLoading, registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "react-native-elements";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { client } from "shared/graphql";
import theme from "shared/theme";

const App = () => {
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_200ExtraLight,
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <SafeAreaProvider>
      <ApolloProvider {...{ client }}>
        <ThemeProvider useDark {...{ theme }}>
          <StatusBar style="dark" />
        </ThemeProvider>
      </ApolloProvider>
    </SafeAreaProvider>
  );
};

export default registerRootComponent(App);
