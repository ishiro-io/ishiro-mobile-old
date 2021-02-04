import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";

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
              fontSize: 20,
              textAlign: "center"
            }}
          >
            Explorer, rechercher et trouver votre bonheur
          </Text>
          <Text
            style={{
              fontFamily: "Poppins_200ExtraLight",
              fontSize: 13,
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
