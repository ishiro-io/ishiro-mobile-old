import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, Text, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import VisibilityInputButton from "components/VisiblityInputButton";
import {
  MeDocument,
  MeQuery,
  useLoginMutation
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

import { LoginSchema } from "../shared/schemas";
import { IdentifierInputLabel } from "./IdentifierInputLabel";

const { width } = Dimensions.get("screen");

const Login: React.FC<LoginProps> = ({}: LoginProps) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<
    AuthenticationNavigationProps<"Login">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const identifierRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [login, { loading }] = useLoginMutation({ errorPolicy: "all" });

  const onSubmit = async (values: {
    phoneNumberOrUsername: string;
    password: string;
  }) => {
    const response = await login({
      variables: { input: values },
      update: (cache, { data }) => {
        if (!data?.login) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { __typename: "Query", me: data.login }
        });
      }
    });

    if (response) {
      if (response.data?.login) {
        rootNavigation.reset({ index: 0, routes: [{ name: "Content" }] });
      } else {
        const phoneNumberNotConfirmedError = response.errors?.find(
          (e) => e.extensions!.code === "PHONE_NUMBER_NOT_CONFIRMED"
        );
        if (phoneNumberNotConfirmedError) {
          // TODO : Corriger ce use case (Arriver sur login, mais phoneNumber non validé)
          navigation.navigate("ConfirmPhoneNumberCode", { phoneNumber: "" });
        } else {
          setLoginError("Vos identifiants et/ou mot de passe sont incorrects.");
        }
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header
          label="Connexion"
          iconLeft={
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          }
          onIconLeftPress={() => navigation.goBack()}
        />

        <Formik
          initialValues={{
            phoneNumberOrUsername: "",
            password: ""
          }}
          validationSchema={LoginSchema}
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
                ref={identifierRef}
                label={<IdentifierInputLabel />}
                containerStyle={{ marginBottom: theme.spacing?.m }}
                rightIcon={
                  <ClearInputButton
                    value={values.phoneNumberOrUsername}
                    onPress={() => setFieldValue("phoneNumberOrUsername", "")}
                  />
                }
                value={values.phoneNumberOrUsername}
                onChangeText={handleChange("phoneNumberOrUsername")}
                onBlur={handleBlur("phoneNumberOrUsername")}
                errorMessage={errors.phoneNumberOrUsername}
                keyboardType="default"
                autoCompleteType="off"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <Input
                ref={passwordRef}
                label="Mot de passe"
                rightIcon={
                  <View style={{ flexDirection: "row" }}>
                    <ClearInputButton
                      value={values.password}
                      onPress={() => setFieldValue("password", "")}
                    />
                    <VisibilityInputButton
                      isVisible={isPasswordVisible}
                      onPress={() => setIsPasswordVisible((p) => !p)}
                    />
                  </View>
                }
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                errorMessage={errors.password}
                autoCompleteType="password"
                secureTextEntry={!isPasswordVisible}
                returnKeyType="done"
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
                title="Connexion"
                {...{ loading }}
                loadingProps={{ color: theme.colors?.black }}
              />

              <Button
                type="outline"
                containerStyle={{
                  marginTop: theme.spacing?.xl
                }}
                buttonStyle={{
                  backgroundColor: theme.colors?.black,
                  width: width * 0.45,
                  borderRadius: theme.borderRadii?.xl,
                  borderWidth: 1,
                  borderColor: theme.colors?.grey5
                }}
                titleStyle={{
                  textTransform: "uppercase",
                  fontFamily: "Poppins_400Regular",
                  fontSize: 11,
                  textAlign: "center",
                  color: theme.colors?.grey5
                }}
                title="Mot de passe oublié"
                onPress={() => navigation.navigate("ForgotPassword")}
              />
            </View>
          )}
        </Formik>
      </View>
    </DismissKeyboard>
  );
};

export default Login;

interface LoginProps {}
