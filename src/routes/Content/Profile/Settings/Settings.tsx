import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ProfileSettingsRoutes } from "shared/navigation/Routes";

import { ChangeUsername } from "./ChangeUsername";
import InfoParagraph from "./InfoParagraph/InfoParagraph";
import { SettingsMain } from "./Main";

const ProfileSettingsStack = createStackNavigator<ProfileSettingsRoutes>();

const Settings: React.FC<SettingsProps> = ({}: SettingsProps) => {
  return (
    <ProfileSettingsStack.Navigator
      initialRouteName="SettingsMain"
      headerMode="none"
    >
      <ProfileSettingsStack.Screen
        name="SettingsMain"
        component={SettingsMain}
      />
      <ProfileSettingsStack.Screen
        name="InfoParagraph"
        component={InfoParagraph}
      />
      <ProfileSettingsStack.Screen
        name="ChangeUsername"
        component={ChangeUsername}
      />
    </ProfileSettingsStack.Navigator>
  );
};

export default Settings;

interface SettingsProps {}
