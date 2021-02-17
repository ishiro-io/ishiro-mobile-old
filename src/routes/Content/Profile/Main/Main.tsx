import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ColorHash from "color-hash";
import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar, Text, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

import { Header } from "components";
import { useMeQuery } from "shared/graphql/generated";
import { ProfileNavigationProps } from "shared/navigation/NavigationProps";

const hash = new ColorHash();

const ProfileMain: React.FC<ProfileMainProps> = ({}: ProfileMainProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    ProfileNavigationProps<"ProfileMain">["navigation"]
  >();

  const { data } = useMeQuery();

  return (
    <View style={{ flex: 1 }}>
      <Header
        label="Profil"
        iconLeft={
          <MaterialIcons
            name="keyboard-arrow-left"
            size={moderateScale(32)}
            color="white"
          />
        }
        iconRight={
          <MaterialCommunityIcons
            name="settings"
            size={moderateScale(32)}
            color="white"
          />
        }
        onIconLeftPress={() => navigation.goBack()}
        onIconRightPress={() => navigation.navigate("Settings")}
      />

      <View
        style={{ flex: 0.6, justifyContent: "center", alignItems: "center" }}
      >
        <Avatar
          rounded
          title={data?.me?.username.substring(0, 2)}
          size="xlarge"
          titleStyle={{ fontSize: theme.textSize.xxl }}
          overlayContainerStyle={{
            backgroundColor: hash.hex(data?.me?.username || ""),
            borderWidth: 4,
            borderColor: theme.colors?.white
          }}
        />

        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: theme.textSize.xl,
            marginBottom: theme.spacing?.["3xl"],
            marginTop: theme.spacing?.l
          }}
        >
          {data?.me?.username}
        </Text>
      </View>
    </View>
  );
};

export default ProfileMain;

interface ProfileMainProps {}
