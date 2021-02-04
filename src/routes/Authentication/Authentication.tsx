import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { AuthenticationRoutes } from "shared/navigation/Routes";

import { AskConfirmPhoneNumberCode } from "./AskConfirmPhoneNumberCode";
import { ConfirmPhoneNumberCode } from "./ConfirmPhoneNumberCode";
import { Onboarding } from "./Onboarding";
import { SetUsername } from "./SetUsername";

const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

const Authentication: React.FC = () => {
  return (
    <AuthenticationStack.Navigator
      initialRouteName="Onboarding"
      headerMode="none"
    >
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen
        name="AskConfirmPhoneNumberCode"
        component={AskConfirmPhoneNumberCode}
      />
      <AuthenticationStack.Screen
        name="ConfirmPhoneNumberCode"
        component={ConfirmPhoneNumberCode}
      />
      <AuthenticationStack.Screen
        name="SetUsername"
        component={SetUsername}
        options={{ gestureEnabled: false }}
      />
    </AuthenticationStack.Navigator>
  );
};

export default Authentication;
