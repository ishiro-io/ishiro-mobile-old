import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import {
  MeDocument,
  MeQuery,
  useGoogleRegisterMutation,
  usePhoneRegisterMutation
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

import { GoogleSetUsernameSchema } from "../../shared/schemas";

const SetUsername: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const route = useRoute<
    AuthenticationNavigationProps<"SetUsername">["route"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const [phoneRegister, { loading: phoneLoading }] = usePhoneRegisterMutation({
    errorPolicy: "all"
  });

  const [
    googleRegister,
    { loading: googleLoading }
  ] = useGoogleRegisterMutation({
    errorPolicy: "all"
  });

  const [connectError, setLoginError] = useState<string | undefined>(undefined);

  const onSubmit = async (values: { username: string }) => {
    const { type } = route.params;

    console.log({ params: route.params });

    switch (type) {
      case "Google": {
        const response = await googleRegister({
          variables: {
            input: {
              accountId: route.params.accountId!,
              username: values.username
            }
          },
          update: (cache, { data }) => {
            if (!data?.googleRegister) return;
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: { __typename: "Query", me: data.googleRegister }
            });
          }
        });

        if (response) {
          if (response.data?.googleRegister) {
            rootNavigation.reset({ index: 0, routes: [{ name: "Content" }] });
          } else {
            setLoginError("Ce nom d'utilisateur est indisponible");
          }
        }

        break;
      }

      case "Phone": {
        const response = await phoneRegister({
          variables: {
            input: {
              code: route.params.code!,
              phoneNumber: route.params.phoneNumber!,
              username: values.username
            }
          },
          update: (cache, { data }) => {
            if (!data?.phoneRegister) return;
            cache.writeQuery<MeQuery>({
              query: MeDocument,
              data: { __typename: "Query", me: data.phoneRegister }
            });
          }
        });

        if (response) {
          if (response.data?.phoneRegister) {
            rootNavigation.reset({ index: 0, routes: [{ name: "Content" }] });
          } else {
            setLoginError("Ce nom d'utilisateur est indisponible");
          }
        }

        break;
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header label="Créer votre profil" justifyContent="center" />

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
                  (errors.username || connectError) ??
                  "Il apparaîtra sur votre profil Ishiro et ne sera rien qu'à vous."
                }
                errorStyle={{
                  fontSize: theme.textsize?.xs,
                  color:
                    errors.username || connectError
                      ? theme.colors?.error
                      : theme.colors?.grey5
                }}
                keyboardType="default"
                autoCompleteType="off"
                returnKeyType="send"
                blurOnSubmit={false}
                onSubmitEditing={() => handleSubmit()}
              />

              <Button
                type="solid"
                buttonStyle={{
                  backgroundColor: theme.colors?.white
                }}
                containerStyle={{
                  marginBottom: theme.spacing?.m
                }}
                titleStyle={{
                  color: theme.colors?.black
                }}
                onPress={() => handleSubmit()}
                title="Continuer"
                loading={googleLoading || phoneLoading}
                loadingProps={{ color: theme.colors?.black }}
              />
            </View>
          )}
        </Formik>
      </View>
    </DismissKeyboard>
  );
};

export default SetUsername;
