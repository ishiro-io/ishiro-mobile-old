import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

import { DismissKeyboard } from "components";

import { SearchFlatList } from "./SearchFlatList";

const OpenSearchContent: React.FC<OpenSearchContentProps> = ({
  searchValue
}: OpenSearchContentProps) => {
  const { theme } = useContext(ThemeContext);

  if (searchValue.length < 3)
    return (
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            marginTop: theme.spacing?.xxl,
            marginHorizontal: theme.spacing?.xl,
            justifyContent: "flex-start",
            alignItems: "center"
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: moderateScale(20, 0.25),
              textAlign: "center"
            }}
          >
            Explorer, rechercher et trouver votre bonheur
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_200ExtraLight",
              fontSize: theme.textSize.s,
              textAlign: "center",
              paddingTop: theme.spacing?.s
            }}
          >
            Parmis notre large liste d'animes, de films ou encore d'OAV
          </Text>
        </View>
      </DismissKeyboard>
    );

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <SearchFlatList {...{ searchValue }} />
      </View>
    </DismissKeyboard>
  );
};

export default OpenSearchContent;

interface OpenSearchContentProps {
  searchValue: string;
}
