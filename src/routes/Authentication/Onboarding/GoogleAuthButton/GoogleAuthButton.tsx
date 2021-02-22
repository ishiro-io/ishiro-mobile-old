import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

import GoogleLogoSvg from "components/svg/GoogleLogoSvg";
import {
  MeDocument,
  MeQuery,
  useGoogleConnectMutation
} from "shared/graphql/generated";
import { useUpdateEffect } from "shared/hooks";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({}: GoogleAuthButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"Onboarding">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const [connect, { loading: connectLoading }] = useGoogleConnectMutation({
    errorPolicy: "all"
  });

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userGoogleId, setUserGoogleId] = useState<string | undefined>(
    undefined
  );

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.manifest.extra.googleExpoClientId,
    iosClientId: Constants.manifest.extra.googleIosAppId,
    androidClientId: Constants.manifest.extra.googleAndroidAppId,
    selectAccount: true,
    language: "fr-FR"
  });

  // ? Reset state on render
  useEffect(() => {
    setAccessToken(undefined);
    setUserGoogleId(undefined);
  }, [navigation]);

  // ? Quand nous recevons une réponse de l'auth google, on récupère l'access token
  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      if (authentication) setAccessToken(authentication.accessToken);
    }
  }, [response]);

  // ? Dès qu'on à un access token, récupère l'id Google du user
  useUpdateEffect(() => {
    const fetchUserInfo = async () => {
      const userInfoResponse = await fetch(
        Constants.manifest.extra.googleUserApiEndpoint,
        {
          headers: { Authorization: `Bearer ${accessToken}` }
        }
      );

      const userInfo: GoogleUser = await userInfoResponse.json();
      setUserGoogleId(userInfo.id);
    };

    if (accessToken) fetchUserInfo();
  }, [accessToken]);

  // ? Dès qu'on a un id de user Google, on vérifie si il est déja register
  useUpdateEffect(() => {
    const connectUser = async (accountId: string) => {
      const connectResponse = await connect({
        variables: {
          input: { accountId }
        },
        update: (cache, { data }) => {
          if (!data?.googleConnect?.user) return;
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { __typename: "Query", me: data.googleConnect.user }
          });
        }
      });

      if (connectResponse) {
        if (connectResponse.data?.googleConnect?.user) {
          rootNavigation.navigate("Content");
        } else {
          navigation.navigate("SetUsername", {
            type: "Google",
            accountId
          });
        }
      }
    };

    if (userGoogleId) {
      connectUser(userGoogleId);
    }
  }, [userGoogleId]);

  return (
    <Button
      type="outline"
      buttonStyle={{
        borderColor: theme.colors?.primaryLighter,
        borderWidth: moderateScale(2, 0.25)
      }}
      disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
      titleStyle={{
        color: theme.colors?.white
      }}
      containerStyle={{
        marginBottom: theme.spacing.s
      }}
      disabled={!request}
      icon={
        <View style={{ marginRight: theme.spacing?.m }}>
          <GoogleLogoSvg />
        </View>
      }
      onPress={() => promptAsync()}
      title="Continuer avec Google"
      loading={connectLoading}
      loadingProps={{ color: theme.colors?.white }}
    />
  );
};

export default GoogleAuthButton;

interface GoogleAuthButtonProps {}

interface GoogleUser {
  id?: string;
  email?: string;
  verified_email?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
  locale?: string;
}
