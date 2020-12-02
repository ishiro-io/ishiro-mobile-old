import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image, View } from "react-native";

import { Header } from "components";
import { ContentNavigationProps } from "shared/navigation/NavigationProps";
import { HomeRoutes } from "shared/navigation/Routes";

import { AnimeInfo } from "../shared/screens/AnimeInfo";
import { CategoryList } from "../shared/screens/CategoryList";
import HomeFlatPreviewList from "./FlatPreviewList/FlatPreviewList";

const HomeStack = createStackNavigator<HomeRoutes>();

const Home = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home" headerMode="none">
      <HomeStack.Screen name="Home" component={HomeContent} />
      <HomeStack.Screen name="AnimeInfo" component={AnimeInfo} />
      <HomeStack.Screen name="CategoryList" component={CategoryList} />
    </HomeStack.Navigator>
  );
};

const HomeContent: React.FC = () => {
  const navigation = useNavigation<
    ContentNavigationProps<"Main">["navigation"]
  >();

  return (
    <View style={{ flex: 1 }}>
      <Header
        iconLeft={
          <Image
            source={require("../../../../assets/images/logo.png")}
            style={{
              height: 40,
              width: 40,
              resizeMode: "cover"
            }}
          />
        }
        iconRight={<MaterialIcons name="person" size={32} color="white" />}
        onIconRightPress={() => navigation.navigate("Profile")}
      />
      <HomeFlatPreviewList />
    </View>
  );
};

export default Home;
