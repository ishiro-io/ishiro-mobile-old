import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";
import { ThemeContext } from "react-native-elements";

import { Header } from "components";
import { AnimeInfoModalNavigationProps } from "shared/navigation/NavigationProps";

const ArcListModal: React.FC<ArcListModalProps> = ({}: ArcListModalProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    AnimeInfoModalNavigationProps<"ArcListModal">["route"]
  >();

  const navigation = useNavigation<
    AnimeInfoModalNavigationProps<"ArcListModal">["navigation"]
  >();

  const { arcList, selectedArcIndex, setSelectedArcIndex } = route.params;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors?.black
      }}
    >
      <Header
        label="Saisons"
        iconLeft={<MaterialIcons name="close" size={32} color="white" />}
        onIconLeftPress={() => navigation.goBack()}
      />
      {arcList.map((arc, index) => (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => {
            setSelectedArcIndex(index);
            navigation.goBack();
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              fontSize: 17,
              paddingLeft: theme.spacing?.m,
              paddingVertical: theme.spacing?.s,
              color:
                arc === arcList[selectedArcIndex!]
                  ? theme.colors?.primaryLighter
                  : theme.colors?.white
            }}
          >
            {arc.title} ({arc.firstEpisodeNumber}-{arc.lastEpisodeNumber})
          </Text>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

export default ArcListModal;

interface ArcListModalProps {}
