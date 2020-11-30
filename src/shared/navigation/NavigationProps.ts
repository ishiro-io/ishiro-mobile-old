import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import {
  AppRoutes,
  AuthenticationRoutes,
  ContentRoutes,
  HomeRoutes,
  MainTabsRoutes,
  SearchRoutes,
  SearchTabRoutes,
  StatusListsRoutes,
  StatusListsTabRoutes
} from "./Routes";

export interface AppNavigationProps<RouteName extends keyof AppRoutes> {
  navigation: StackNavigationProp<AppRoutes, RouteName>;
  route: RouteProp<AppRoutes, RouteName>;
}

export interface AuthenticationNavigationProps<
  RouteName extends keyof AuthenticationRoutes
> {
  navigation: StackNavigationProp<AuthenticationRoutes, RouteName>;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}

export interface ContentNavigationProps<RouteName extends keyof ContentRoutes> {
  navigation: StackNavigationProp<ContentRoutes, RouteName>;
  route: RouteProp<ContentRoutes, RouteName>;
}

export interface MainTabNavigationProps<
  RouteName extends keyof MainTabsRoutes
> {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsRoutes, RouteName>,
    StackNavigationProp<ContentRoutes>
  >;
  route: RouteProp<MainTabsRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: StackNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

export interface SearchTabNavigationProps<
  RouteName extends keyof SearchTabRoutes
> {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<SearchTabRoutes, RouteName>,
    StackNavigationProp<SearchRoutes>
  >;
  route: RouteProp<SearchTabRoutes, RouteName>;
}

export interface SearchNavigationProps<RouteName extends keyof SearchRoutes> {
  navigation: StackNavigationProp<SearchRoutes, RouteName>;
  route: RouteProp<SearchRoutes, RouteName>;
}

export interface StatusListsTabNavigationProps<
  RouteName extends keyof StatusListsTabRoutes
> {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<StatusListsTabRoutes, RouteName>,
    StackNavigationProp<StatusListsRoutes>
  >;
  route: RouteProp<StatusListsTabRoutes, RouteName>;
}

export interface StatusListsNavigationProps<
  RouteName extends keyof StatusListsRoutes
> {
  navigation: StackNavigationProp<StatusListsRoutes, RouteName>;
  route: RouteProp<StatusListsRoutes, RouteName>;
}
