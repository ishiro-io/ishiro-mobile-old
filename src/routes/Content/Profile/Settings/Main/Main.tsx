import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import React, { useContext } from "react";
import { Alert, Platform, View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { moderateScale } from "react-native-size-matters";

import { Header } from "components";
import { cache } from "shared/graphql";
import {
  MeDocument,
  MeQuery,
  useLogoutMutation,
  useMeQuery
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  ProfileSettingsNavigationProps
} from "shared/navigation/NavigationProps";

import { SettingsAction } from "./Action";
import { SettingsGroup } from "./Group";

const SettingsMain: React.FC<SettingsMainProps> = ({}: SettingsMainProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    ProfileSettingsNavigationProps<"SettingsMain">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Content">["navigation"]
  >();

  const { data } = useMeQuery();

  const [logout, { loading }] = useLogoutMutation();

  const onEmptyCache = () => {
    Alert.alert(
      "Vider tout le cache ?",
      "Tout le cache sera vidé. Le chargement peut être plus long qu'habituellement.",
      [
        {
          text: "Effacer",
          style: "destructive",
          onPress: async () => {
            await cache.reset();
          }
        },
        { text: "Annuler", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  const onDisconnect = () => {
    const disconnect = async () => {
      rootNavigation.reset({ index: 0, routes: [{ name: "Authentication" }] });

      await logout({
        update: () => {
          if (!data) return;
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { __typename: "Query", me: null }
          });
        }
      });
    };

    Alert.alert(
      "Tu pars ?",
      "Tu es sûr(e) de vouloir te déconnecter ?\n On espère te revoir très vite!",
      [
        { text: "Se déconnecter", style: "destructive", onPress: disconnect },
        { text: "Annuler", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      style={{
        flex: 1
      }}
    >
      <Header
        label="Préférences"
        iconLeft={
          <MaterialIcons
            name="keyboard-arrow-left"
            size={moderateScale(32)}
            color="white"
          />
        }
        onIconLeftPress={() => navigation.goBack()}
      />

      <View
        style={{
          flex: 1
        }}
      >
        <ScrollView
          contentContainerStyle={{
            alignItems: "center"
          }}
          showsVerticalScrollIndicator={false}
        >
          <SettingsGroup title="Mon compte">
            <SettingsAction
              title="Nom d'utilisateur"
              value={data?.me?.username}
              onPress={() => navigation.navigate("ChangeUsername")}
            />
          </SettingsGroup>

          <SettingsGroup title="Assistance">
            <SettingsAction
              title="J'ai besoin d'aide"
              onPress={() =>
                WebBrowser.openBrowserAsync("https://discord.gg/J9GKtM6CJB")
              }
            />
          </SettingsGroup>

          <SettingsGroup title="Plus d'informations">
            <SettingsAction
              title="CGU"
              onPress={() =>
                navigation.navigate("InfoParagraph", {
                  title: "Conditions d'utilisations",
                  text: ""
                })
              }
            />
            <SettingsAction
              title="Politique de confidentialité"
              onPress={() =>
                navigation.navigate("InfoParagraph", {
                  title: "Politique de confidentialité",
                  text: ""
                })
              }
            />
            <SettingsAction
              title="Version de l'application"
              value={
                (Platform.OS === "ios"
                  ? Constants.nativeBuildVersion
                  : `${Constants.nativeAppVersion}.${Constants.nativeBuildVersion}`) ||
                "Error"
              }
            />
          </SettingsGroup>

          <SettingsGroup title="Actions">
            <SettingsAction title="Vider le cache" onPress={onEmptyCache} />
            <SettingsAction
              title="Effacer l'historique de recherche"
              isDisabled
            />
          </SettingsGroup>

          <Button
            type="solid"
            containerStyle={{
              marginTop: theme.spacing?.m,
              marginBottom: theme.spacing?.xxl
            }}
            buttonStyle={{
              backgroundColor: theme.colors?.primaryLighter
            }}
            title="Déconnexion"
            onPress={onDisconnect}
            loading={loading}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default SettingsMain;

interface SettingsMainProps {}
