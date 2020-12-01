import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

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
  return (
    <AuthenticationStack.Navigator
      initialRouteName="Onboarding"
      headerMode="none"
    >
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmPhoneNumberCode"
        component={ConfirmPhoneNumberCode}
        options={{ gestureEnabled: false }}
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
        initialParams={{ token: "506400" }}
      />
      <AuthenticationStack.Screen
        name="GoogleSetUsername"
        component={GoogleSetUsername}
        options={{ gestureEnabled: false }}
      />
    </AuthenticationStack.Navigator>
  );
};

export default Authentication;
