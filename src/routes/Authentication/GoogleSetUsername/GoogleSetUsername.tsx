import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Dimensions, Text, View } from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import {
  MeDocument,
  MeQuery,
  useLoginWithGoogleMutation
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

import { GoogleSetUsernameSchema } from "../shared/schemas";

const { width } = Dimensions.get("screen");

const GoogleSetUsername: React.FC<GoogleSetUsernameProps> = ({}: GoogleSetUsernameProps) => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    AuthenticationNavigationProps<"GoogleSetUsername">["route"]
  >();

  const navigation = useNavigation<
    AuthenticationNavigationProps<"GoogleSetUsername">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const [loginWithGoogle, { loading }] = useLoginWithGoogleMutation({
    errorPolicy: "all"
  });

  const [loginError, setLoginError] = useState("");

  const onSubmit = async (values: { username: string }) => {
    const { accountId } = route.params;

    const response = await loginWithGoogle({
      variables: {
        input: { accountId, username: values.username }
      },
      update: (cache, { data }) => {
        if (!data?.loginWithGoogle) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { __typename: "Query", me: data.loginWithGoogle }
        });
      }
    });

    if (response) {
      if (response.data?.loginWithGoogle) {
        rootNavigation.reset({ index: 0, routes: [{ name: "Content" }] });
      } else {
        setLoginError("Ce nom d'utilisateur est indisponible");
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header label="Créer un compte" justifyContent="center" />

        <Formik
          initialValues={{
            username: ""
          }}
          validationSchema={GoogleSetUsernameSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            setFieldValue
          }) => (
            <View
              style={{
                marginTop: theme.spacing?.m,
                paddingHorizontal: theme.spacing?.xs,
                alignItems: "center"
              }}
            >
              <Input
                label="Nom d'utilisateur"
                containerStyle={{ marginBottom: theme.spacing?.m }}
                rightIcon={
                  <ClearInputButton
                    value={values.username}
                    onPress={() => setFieldValue("username", "")}
                  />
                }
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                errorMessage={
                  errors.username ??
                  "Il apparaîtra sur votre profil Ishiro et ne sera rien qu'à vous."
                }
                errorStyle={{
                  color: errors.username
                    ? theme.colors?.error
                    : theme.colors?.grey5
                }}
                keyboardType="default"
                autoCompleteType="off"
                returnKeyType="send"
                blurOnSubmit={false}
                onSubmitEditing={() => handleSubmit()}
              />

              <View style={{ height: 30, alignItems: "center" }}>
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: 12,
                    color: theme.colors?.error
                  }}
                >
                  {loginError}
                </Text>
              </View>

              <Button
                type="solid"
                buttonStyle={{
                  backgroundColor: theme.colors?.white,
                  width: width * 0.8,
                  height: 50,
                  borderRadius: theme.borderRadii?.xxl
                }}
                containerStyle={{
                  marginBottom: theme.spacing?.m
                }}
                titleStyle={{
                  color: theme.colors?.black,
                  fontFamily: "Poppins_600SemiBold",
                  fontSize: 18,
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: 1
                }}
                onPress={() => handleSubmit()}
                title="Continuer"
                {...{ loading }}
                loadingProps={{ color: theme.colors?.black }}
              />
            </View>
          )}
        </Formik>
      </View>
    </DismissKeyboard>
  );
};

export default GoogleSetUsername;

interface GoogleSetUsernameProps {}
