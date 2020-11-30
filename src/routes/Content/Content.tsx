import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import { ContentRoutes } from "shared/navigation/Routes";

import { Main } from "./Main";
import { Profile } from "./Profile";

const MainStack = createStackNavigator<ContentRoutes>();

const Content: React.FC = () => {
  return (
    <MainStack.Navigator initialRouteName="Main" headerMode="none">
      <MainStack.Screen name="Main" component={Main} />
      <MainStack.Screen name="Profile" component={Profile} />
    </MainStack.Navigator>
  );
};

export default Content;
