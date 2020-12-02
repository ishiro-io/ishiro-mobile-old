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
            height: height * 0.85,
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
            height: height * 0.85,
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
            height: height * 0.85
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

          {topRightIcon && (
            <TouchableWithoutFeedback onPress={onTopRightIconPress}>
              <View
                style={{
                  marginTop: theme.spacing?.s,
                  marginRight: theme.spacing?.xs
                }}
              >
                {topRightIcon}
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>

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
  posterImageUrl: string;
  width: number;
  height: number;
  onPress: () => void;
  topRightIcon?: IconNode;
  onTopRightIconPress?: () => void;
}
