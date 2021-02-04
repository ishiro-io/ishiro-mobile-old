import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import { Header } from "components";
import { ProfileSettingsNavigationProps } from "shared/navigation/NavigationProps";

const InfoParagraph: React.FC<InfoParagraphProps> = ({}: InfoParagraphProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    ProfileSettingsNavigationProps<"InfoParagraph">["route"]
  >();

  const navigation = useNavigation<
    ProfileSettingsNavigationProps<"InfoParagraph">["navigation"]
  >();

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header
        label={route.params.title}
        iconLeft={
          <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
        }
        onIconLeftPress={() => navigation.goBack()}
      />

      <View style={{ flex: 1 }}>
        <ScrollView>
          <Text
            style={{
              marginBottom: theme.spacing?.xl,
              paddingHorizontal: theme.spacing?.m,
              fontSize: 16,
              textAlign: "justify"
            }}
          >
            {route.params.text}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default InfoParagraph;

interface InfoParagraphProps {}
