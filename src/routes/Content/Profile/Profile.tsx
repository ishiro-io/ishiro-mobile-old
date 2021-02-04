import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ProfileRoutes } from "shared/navigation/Routes";

import { ProfileMain } from "./Main";
import { Settings } from "./Settings";

const ProfileStack = createStackNavigator<ProfileRoutes>();

const Profile: React.FC<ProfileProps> = ({}: ProfileProps) => {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileMain" headerMode="none">
      <ProfileStack.Screen name="ProfileMain" component={ProfileMain} />
      <ProfileStack.Screen name="Settings" component={Settings} />
    </ProfileStack.Navigator>
  );
};

export default Profile;

interface ProfileProps {}
