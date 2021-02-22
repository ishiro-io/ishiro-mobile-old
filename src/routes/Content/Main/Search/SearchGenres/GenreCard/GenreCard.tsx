import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

import { GenreIcon } from "components";
import { Category } from "shared/graphql/generated";
import { SearchTabNavigationProps } from "shared/navigation/NavigationProps";

const GenreCard: React.FC<GenreCardProps> = ({ data }: GenreCardProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    SearchTabNavigationProps<"Genres">["navigation"]
  >();

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate("CategoryList", {
          categoryId: data.id,
          categoryName: data.name
        })
      }
    >
      <View
        style={{
          backgroundColor: theme.colors?.black,
          height: moderateVerticalScale(100),
          width: moderateScale(155, 1),
          margin: theme.spacing?.s,
          borderRadius: theme.borderRadii?.m,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={{ uri: data.coverImage }}
          style={{
            height: moderateVerticalScale(100),
            borderRadius: theme.borderRadii?.m,
            resizeMode: "cover",
            ...StyleSheet.absoluteFillObject
          }}
        />

        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            height: moderateVerticalScale(100),
            width: moderateScale(155, 1),
            borderRadius: theme.borderRadii?.m,
            backgroundColor: "rgba(0,0,0,0.5)"
          }}
        />

        <GenreIcon name={data.name} />

        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: theme.textSize.s,
            color: theme.colors?.white,
            marginTop: theme.spacing?.s
          }}
        >
          {data.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GenreCard;

interface GenreCardProps {
  data: {
    __typename?: "Category" | undefined;
  } & Pick<Category, "id" | "name" | "coverImage">;
}
