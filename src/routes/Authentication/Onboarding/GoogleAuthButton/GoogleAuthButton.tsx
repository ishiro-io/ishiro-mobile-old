import { useNavigation } from "@react-navigation/native";
import * as Google from "expo-auth-session/providers/google";
import Constants from "expo-constants";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

import GoogleLogoSvg from "components/svg/GoogleLogoSvg";
import {
  MeDocument,
  MeQuery,
  useIsRegisteredWithGoogleLazyQuery,
  useLoginWithGoogleMutation
} from "shared/graphql/generated";
import { useUpdateEffect } from "shared/hooks";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("screen");

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({}: GoogleAuthButtonProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"Onboarding">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const [
    isRegisteredWithGoogle,
    { data: isRegisteredData, loading: isRegisteredLoading }
  ] = useIsRegisteredWithGoogleLazyQuery();
  const [
    loginWithGoogle,
    { loading: loginLoading }
  ] = useLoginWithGoogleMutation({
    errorPolicy: "all"
  });

  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [userGoogleId, setUserGoogleId] = useState<string | undefined>(
    undefined
  );

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: Constants.manifest.extra.googleExpoClientId,
    selectAccount: true
  });

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
    if (userGoogleId)
      isRegisteredWithGoogle({ variables: { accountId: userGoogleId } });
  }, [userGoogleId]);

  // ? Si le user est déja register on le login, sinon on affiche le screen pour qu'il choisisse un username
  useUpdateEffect(() => {
    const loginUser = async () => {
      const loginResponse = await loginWithGoogle({
        variables: { input: { accountId: userGoogleId! } },
        update: (cache, { data: loginData }) => {
          if (!loginData?.loginWithGoogle) return;
          cache.writeQuery<MeQuery>({
            query: MeDocument,
            data: { __typename: "Query", me: loginData.loginWithGoogle }
          });
        }
      });

      if (loginResponse.data?.loginWithGoogle) {
        rootNavigation.reset({
          index: 0,
          routes: [{ name: "Content" }]
        });
      }
    };

    if (isRegisteredData) {
      if (isRegisteredData.isRegisteredWithGoogle) loginUser();
      else {
        navigation.navigate("GoogleSetUsername", {
          accountId: userGoogleId!
        });
      }
    }
  }, [isRegisteredData]);

  return (
    <Button
      type="outline"
      buttonStyle={{
        width: width * 0.8,
        height: 50,
        borderRadius: theme.borderRadii?.xxl,
        borderWidth: 2,
        borderColor: theme.colors?.primaryLighter
      }}
      disabled={!request}
      disabledStyle={{ backgroundColor: theme.colors?.grey8 }}
      containerStyle={{
        marginBottom: theme.spacing?.m
      }}
      titleStyle={{
        color: theme.colors?.white,
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        textTransform: "uppercase",
        textAlign: "center",
        letterSpacing: 1
      }}
      icon={
        <View style={{ marginRight: theme.spacing?.m }}>
          <GoogleLogoSvg width={24} height={24} />
        </View>
      }
      onPress={() => promptAsync()}
      title="Continuer avec Google"
      loading={isRegisteredLoading || loginLoading}
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
