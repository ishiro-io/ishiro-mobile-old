import { useRoute } from "@react-navigation/native";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

import {
  AnimeStatus,
  AnimeType,
  useAnimeAdditionalInfoQuery
} from "shared/graphql/generated";
import { AnimeInfoTabNavigationProps } from "shared/navigation/NavigationProps";

import { GenreBadge } from "./GenreBadge";
import { Row } from "./Row";

const readableStatus = (status: AnimeStatus): string => {
  switch (status) {
    case AnimeStatus.Ongoing:
      return "En cours";

    case AnimeStatus.Cancelled:
      return "Annulé";

    case AnimeStatus.Finished:
      return "Terminé";

    case AnimeStatus.ComingSoon:
      return "A venir";

    default:
      return "En cours";
  }
};

const readableType = (type: AnimeType): string => {
  switch (type) {
    case AnimeType.Movie:
      return "Film";

    case AnimeType.Music:
      return "Musique";

    case AnimeType.Ona:
      return "ONA";

    case AnimeType.Ova:
      return "OAV";

    case AnimeType.Tv:
      return "Séries TV";

    case AnimeType.TvSpecial:
      return "Épisode spécial";

    default:
      return "Iconnu";
  }
};

const AnimeInformations: React.FC<AnimeInformationsProps> = ({}: AnimeInformationsProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    AnimeInfoTabNavigationProps<"Informations">["route"]
  >();

  const { data, loading } = useAnimeAdditionalInfoQuery({
    variables: { id: route.params.animeId }
  });

  const [isDescCollapsed, setIsDescCollapsed] = useState(true);

  const scrollViewRef = useRef<ScrollView | null>(null);

  if (loading)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  return (
    <ScrollView
      style={{
        flex: 1
      }}
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          marginHorizontal: theme.spacing?.m,
          alignItems: "center"
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: theme.spacing?.l }}
        >
          {data?.anime!.categories.map((c) => {
            return <GenreBadge key={c.id} name={c.name} />;
          })}
        </ScrollView>

        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              color: theme.colors?.white,
              fontFamily: "Poppins_300Light",
              textAlign: "justify"
            }}
            numberOfLines={isDescCollapsed ? 5 : undefined}
            lineBreakMode="tail"
          >
            {data?.anime!.description}
          </Text>

          <Button
            type="outline"
            containerStyle={{
              marginTop: theme.spacing?.m
            }}
            buttonStyle={{
              width: 120,
              borderRadius: theme.borderRadii?.xl,
              borderWidth: 1,
              borderColor: theme.colors?.grey5
            }}
            titleStyle={{
              textTransform: "uppercase",
              fontFamily: "Poppins_400Regular",
              fontSize: 12,
              textAlign: "center",
              color: theme.colors?.grey5
            }}
            title={isDescCollapsed ? "Lire plus" : "Lire moins"}
            onPress={() => {
              if (!isDescCollapsed)
                scrollViewRef.current?.scrollTo({
                  x: 0,
                  y: 0,
                  animated: false
                });
              setIsDescCollapsed((prev) => !prev);
            }}
          />
        </View>
      </View>

      <View
        style={{
          marginVertical: theme.spacing?.m,
          marginHorizontal: theme.spacing?.l
        }}
      >
        {data?.anime?.releaseDate && (
          <Row
            title="Date de publication"
            data={format(new Date(data.anime.releaseDate), "PP", {
              locale: fr
            })}
          />
        )}

        {data?.anime?.endDate && (
          <Row
            title="Date de fin"
            data={format(new Date(data.anime.endDate), "PP", {
              locale: fr
            })}
          />
        )}

        {data?.anime?.status && (
          <Row title="Statut" data={readableStatus(data.anime.status)} />
        )}

        {data?.anime?.duration && (
          <Row
            title={
              data?.anime.type !== AnimeType.Movie ? "Durée moyenne" : "Durée"
            }
            data={data.anime.duration}
          />
        )}

        {data?.anime?.type && (
          <Row title="Type" data={readableType(data.anime.type)} />
        )}
      </View>
    </ScrollView>
  );
};

export default AnimeInformations;

interface AnimeInformationsProps {}
