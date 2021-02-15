import { LinearGradient } from "expo-linear-gradient";
import React, { useContext } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { IconNode, Image, Text, ThemeContext } from "react-native-elements";

const AnimeCard: React.FC<AnimeCardProps> = ({
  title,
  posterImageUrl,
  episodeText,
  episodeNumber,
  height,
  width,
  topRightIcon,
  onPress,
  onTopRightIconPress
}: AnimeCardProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          width,
          height,
          margin: theme.spacing?.s
        }}
      >
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            height: height * 0.8,
            borderRadius: theme.borderRadii?.m,
            backgroundColor: theme.colors?.grey9,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ActivityIndicator color={theme.colors?.white} />
        </View>

        <Image
          source={{ uri: posterImageUrl }}
          style={{
            height: height * 0.8,
            borderRadius: theme.borderRadii?.m,
            resizeMode: "cover"
          }}
          placeholderStyle={{ backgroundColor: theme.colors?.grey9 }}
        />

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            height: height * 0.8
          }}
        >
          <LinearGradient
            colors={["rgba(0,0,0,0.7)", "transparent"]}
            locations={[0, 0.4]}
            style={{
              ...StyleSheet.absoluteFillObject,
              borderRadius: theme.borderRadii?.m
            }}
          />
        </View>

        {episodeText !== undefined && episodeNumber !== undefined && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: "flex-end",
              height: height * 0.8
            }}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              locations={[0.5, 1]}
              style={{
                ...StyleSheet.absoluteFillObject,
                borderRadius: theme.borderRadii?.m
              }}
            />
            <View style={{ margin: theme.spacing?.xs }}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 11
                }}
              >
                {episodeText}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_200ExtraLight",
                  fontSize: 20
                }}
              >
                {episodeNumber}
              </Text>
            </View>
          </View>
        )}

        {topRightIcon && (
          <View
            style={{
              ...StyleSheet.absoluteFillObject
            }}
          >
            <TouchableWithoutFeedback onPress={onTopRightIconPress}>
              <View
                style={{
                  marginTop: theme.spacing?.s,
                  marginRight: theme.spacing?.xs,
                  alignSelf: "flex-end"
                }}
              >
                {topRightIcon}
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}

        <Text
          style={{
            fontSize: 13,
            marginTop: theme.spacing?.s
          }}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AnimeCard;

interface AnimeCardProps {
  title: string;
  posterImageUrl?: string;
  episodeText?: string;
  episodeNumber?: number;
  width: number;
  height: number;
  onPress: () => void;
  topRightIcon?: IconNode;
  onTopRightIconPress?: () => void;
}
