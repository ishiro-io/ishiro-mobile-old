import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ThemeContext } from "react-native-elements";

import { LoadingScreen } from "components";
import { Authentication } from "routes/Authentication";
import { Content } from "routes/Content";
import { cache } from "shared/graphql";
import { useMeQuery } from "shared/graphql/generated";
import { AppRoutes } from "shared/navigation/Routes";

const Stack = createStackNavigator<AppRoutes>();

const AppNavigator: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  if (__DEV__) cache.reset();

  const { data, loading } = useMeQuery();

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DarkTheme.colors,
          background: theme.colors!.black!,
          primary: theme.colors!.primary!,
          text: theme.colors!.white!
        }
      }}
    >
      <Stack.Navigator
        headerMode="none"
        // initialRouteName={data?.me ? "Content" : "Authentication"}
        initialRouteName="Content"
      >
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
