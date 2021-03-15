import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ColorHash from "color-hash";
import { intervalToDuration } from "date-fns";
import React, { useContext } from "react";
import { View } from "react-native";
import { Avatar, Text, ThemeContext } from "react-native-elements";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

import { Header } from "components";
import { useMeQuery } from "shared/graphql/generated";
import { ProfileNavigationProps } from "shared/navigation/NavigationProps";

import { Statistic } from "./Statistic";

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

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            marginTop: theme.spacing.xl,
            marginBottom: theme.spacing.xxl,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Avatar
            rounded
            title={data?.me?.username.substring(0, 2)}
            size={moderateVerticalScale(125)}
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
              fontSize: theme.textSize.l,
              marginTop: theme.spacing?.l
            }}
          >
            {data?.me?.username}
          </Text>
        </View>

        <Statistic
          title="Temps total"
          value={formatTotalTime(data.me.totalSeenTime)}
        />
        <Statistic
          title="Animes terminés"
          value={`${data.me.animeSeenCount} animes`}
        />
        <Statistic
          title="Nombre d'épisodes vus"
          value={`${data.me.episodeSeenCount} épisodes`}
        />
      </View>
    </View>
  );
};

const formatTotalTime = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  let time = "";
  let dayWord =
    duration.days && duration.hours && duration.minutes ? "j" : " jours";
  let hourWord =
    duration.days && duration.hours && duration.minutes ? "h" : " heures";
  let minWord =
    duration.days && duration.hours && duration.minutes ? "min" : " minutes";

  if (duration.days) time += `${duration.days}${dayWord}`;
  if (duration.days && duration.hours) time += ", ";
  if (duration.hours) time += `${duration.hours}${hourWord}`;
  if (duration.hours && duration.minutes) time += " et ";
  if (duration.minutes) time += `${duration.minutes}${minWord}`;

  return time;
};

export default ProfileMain;

interface ProfileMainProps {}
