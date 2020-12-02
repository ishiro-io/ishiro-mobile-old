import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { ScrollView, Text, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import AnimeCard from "components/AnimeCard";
import { CategoryPreviewFieldsFragment } from "shared/graphql/generated";
import { HomeNavigationProps } from "shared/navigation/NavigationProps";

import SeeMoreCard from "./SeeMoreCard/SeeMoreCard";

const CARD_WIDTH = 125;
const CARD_HEIGHT = 210;

const HomePreviewList: React.FC<AnimePreviewListProps> = ({
  categoryPreview
}: AnimePreviewListProps) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<HomeNavigationProps<"Home">["navigation"]>();
  return (
    <View
      style={{
        flex: 1,
        marginBottom: theme.spacing?.m,
        marginLeft: theme.spacing?.s
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          fontSize: 20,
          color: theme.colors?.white
        }}
      >
        {categoryPreview.title}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryPreview.animes?.map((item) => {
          return (
            <AnimeCard
              title={item.title}
              posterImageUrl={item.posterImage}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              onPress={() =>
                navigation.navigate("AnimeInfo", { animeId: item.id })
              }
            />
          );
        })}
        <SeeMoreCard
          categoryName={categoryPreview.title}
          categoryId={categoryPreview.categoryId!}
        />
      </ScrollView>
    </View>
  );
};

export default HomePreviewList;

interface AnimePreviewListProps {
  categoryPreview: CategoryPreviewFieldsFragment;
}
