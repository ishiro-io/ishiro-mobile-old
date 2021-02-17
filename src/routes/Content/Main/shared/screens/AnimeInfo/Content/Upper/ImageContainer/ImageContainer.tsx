import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Image, Text, ThemeContext } from "react-native-elements";
import { moderateVerticalScale } from "react-native-size-matters";

import { AnimeDataFieldsFragment, AnimeType } from "shared/graphql/generated";

const AnimeInfoUpperImageContainer: React.FC<AnimeInfoUpperImageContainerProps> = ({
  animeData: { title, titleKanji, bannerImage, episodeCount, type }
}: AnimeInfoUpperImageContainerProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View>
      <Image
        source={{
          uri: bannerImage
        }}
        style={{
          borderBottomLeftRadius: theme.borderRadii?.m,
          borderBottomRightRadius: theme.borderRadii?.m,
          overflow: "hidden",
          height: moderateVerticalScale(200)
        }}
      />

      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "flex-end"
        }}
      >
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            borderBottomLeftRadius: theme.borderRadii?.m,
            borderBottomRightRadius: theme.borderRadii?.m,
            height: moderateVerticalScale(200),
            overflow: "hidden"
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.8)", "transparent", "rgba(0, 0, 0, 0.85)"]}
            locations={[0, 0.4, 0.9]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: moderateVerticalScale(200)
            }}
          />
        </View>

        <View style={{ margin: theme.spacing?.m }}>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: theme.textSize.l
            }}
          >
            {title}
          </Text>
          {titleKanji && (
            <Text
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: theme.textSize.m
              }}
            >
              {titleKanji}
            </Text>
          )}
          {type !== AnimeType.Movie && episodeCount > 0 && (
            <Text
              style={{
                fontFamily: "Poppins_200ExtraLight",
                fontSize: theme.textSize.m
              }}
            >
              {episodeCount} épisodes
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default AnimeInfoUpperImageContainer;

interface AnimeInfoUpperImageContainerProps {
  animeData: AnimeDataFieldsFragment;
}
