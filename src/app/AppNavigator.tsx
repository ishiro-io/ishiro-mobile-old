import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppLoading } from "expo";
import React, { useContext } from "react";
import { ThemeContext } from "react-native-elements";

import { LoadingScreen } from "components";
import { Authentication } from "routes/Authentication";
import { Content } from "routes/Content";
import { useMeQuery } from "shared/graphql/generated";
import { AppRoutes } from "shared/navigation/Routes";

const Stack = createStackNavigator<AppRoutes>();

const AppNavigator: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const { data, loading } = useMeQuery();

  if (loading) return <LoadingScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator
        headerMode="none"
        initialRouteName={data?.me ? "Content" : "Authentication"}
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors?.black
          }
        }}
      >
        <Stack.Screen name="Content" component={Content} />
        <Stack.Screen name="Authentication" component={Authentication} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
