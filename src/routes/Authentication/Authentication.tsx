import { createStackNavigator } from "@react-navigation/stack";
import React, { useContext } from "react";
import { ThemeContext } from "react-native-elements";

import { AuthenticationRoutes } from "shared/navigation/Routes";

import { ChangeForgotPassword } from "./ChangeForgotPassword";
import { ConfirmPasswordCode } from "./ConfirmPasswordCode";
import { ConfirmPhoneNumberCode } from "./ConfirmPhoneNumberCode";
import { ForgotPassword } from "./ForgotPassword";
import { GoogleSetUsername } from "./GoogleSetUsername";
import { Login } from "./Login";
import { Onboarding } from "./Onboarding";
import { SignUp } from "./SignUp";

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

const Authentication: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <AuthenticationStack.Navigator
      initialRouteName="ConfirmPhoneNumberCode"
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors?.black
        }
      }}
    >
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmPhoneNumberCode"
        component={ConfirmPhoneNumberCode}
      />
      <AuthenticationStack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <AuthenticationStack.Screen
        name="ConfirmPasswordCode"
        component={ConfirmPasswordCode}
      />
      <AuthenticationStack.Screen
        name="ChangeForgotPassword"
        component={ChangeForgotPassword}
      />
      <AuthenticationStack.Screen
        name="GoogleSetUsername"
        component={GoogleSetUsername}
      />
    </AuthenticationStack.Navigator>
  );
};

export default Authentication;
