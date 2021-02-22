import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

const GenreIcon: React.FC<CategoryIconProps> = ({
  name,
  size = moderateScale(32, 0.1)
}: CategoryIconProps) => {
  const { theme } = useContext(ThemeContext);

  switch (name) {
    case "Comédie":
      return (
        <FontAwesome5
          name="theater-masks"
          size={size * 1.1}
          color={theme.colors?.white}
        />
      );

    case "Fantasy":
      return (
        <MaterialCommunityIcons
          name="sword-cross"
          size={size * 1.1}
          color={theme.colors?.white}
        />
      );

    case "Romance":
      return (
        <FontAwesome5 name="heart" size={size} color={theme.colors?.white} />
      );

    case "Action":
      return (
        <FontAwesome5
          name="fist-raised"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Vie à l'école":
      return (
        <FontAwesome5 name="school" size={size} color={theme.colors?.white} />
      );

    case "Drame":
      return (
        <FontAwesome5
          name="heart-broken"
          size={size * 1.1}
          color={theme.colors?.white}
        />
      );

    case "Aventure":
      return (
        <FontAwesome5 name="compass" size={size} color={theme.colors?.white} />
      );

    case "Tranche de vie":
      return (
        <FontAwesome5 name="coffee" size={size} color={theme.colors?.white} />
      );

    case "Shojo":
      return (
        <FontAwesome5 name="dove" size={size} color={theme.colors?.white} />
      );

    case "Science-fiction":
      return (
        <FontAwesome5 name="rocket" size={size} color={theme.colors?.white} />
      );

    case "Yaoi":
      return (
        <FontAwesome5
          name="mars-double"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Ecchi":
      return (
        <FontAwesome5
          name="pepper-hot"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Sports":
      return (
        <FontAwesome5
          name="volleyball-ball"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Historique":
      return (
        <FontAwesome5
          name="fort-awesome"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Thriller":
      return (
        <FontAwesome5
          name="user-secret"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Harem":
      return (
        <FontAwesome5 name="users" size={size} color={theme.colors?.white} />
      );

    case "Mystère":
      return (
        <FontAwesome5 name="question" size={size} color={theme.colors?.white} />
      );

    case "Magie":
      return (
        <FontAwesome5 name="magic" size={size} color={theme.colors?.white} />
      );

    case "Musique":
      return (
        <FontAwesome5 name="guitar" size={size} color={theme.colors?.white} />
      );

    case "Horreur":
      return (
        <FontAwesome5 name="ghost" size={size} color={theme.colors?.white} />
      );

    case "Mecha":
      return (
        <MaterialCommunityIcons
          name="robot"
          size={size * 1.1}
          color={theme.colors?.white}
        />
      );

    case "Psychologique":
      return (
        <FontAwesome5
          name="heartbeat"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Shonen":
      return (
        <FontAwesome5
          name="shield-alt"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Arts martiaux":
      return (
        <FontAwesome5
          name="torii-gate"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Super pouvoir":
      return (
        <FontAwesome5 name="fire" size={size} color={theme.colors?.white} />
      );

    case "Surnaturel":
      return (
        <FontAwesome5 name="dna" size={size} color={theme.colors?.white} />
      );

    case "Militaire":
      return (
        <FontAwesome5 name="medal" size={size} color={theme.colors?.white} />
      );

    case "Seinen":
      return (
        <FontAwesome5 name="smoking" size={size} color={theme.colors?.white} />
      );

    case "Policier":
      return (
        <FontAwesome5
          name="fingerprint"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Josei":
      return (
        <FontAwesome5 name="seedling" size={size} color={theme.colors?.white} />
      );

    case "Cuisine":
      return (
        <FontAwesome5
          name="cookie-bite"
          size={size}
          color={theme.colors?.white}
        />
      );

    case "Yuri":
      return (
        <FontAwesome5
          name="venus-double"
          size={size}
          color={theme.colors?.white}
        />
      );

    default:
      return (
        <FontAwesome5 name="square" size={size} color={theme.colors?.white} />
      );
  }
};

export default GenreIcon;

interface CategoryIconProps {
  name: string;
  size?: number;
}
