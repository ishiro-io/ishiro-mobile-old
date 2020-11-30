import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, Text, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import VisibilityInputButton from "components/VisiblityInputButton";
import {
  MeDocument,
  MeQuery,
  useChangeForgotPasswordMutation
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

import { ChangeForgotPasswordSchema } from "../shared/schemas";

const { width } = Dimensions.get("screen");

const ChangeForgotPassword: React.FC<ChangeForgotPasswordProps> = ({}: ChangeForgotPasswordProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"ChangeForgotPassword">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const route = useRoute<
    AuthenticationNavigationProps<"ChangeForgotPassword">["route"]
  >();

  const [changePasswordError, setChangeForgotPasswordError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(
    false
  );

  const secondInputRef = useRef<Input | null>(null);

  const [changeForgotPassword, { loading }] = useChangeForgotPasswordMutation({
    errorPolicy: "all"
  });

  const onSubmit = async (values: { password: string }) => {
    const response = await changeForgotPassword({
      variables: {
        input: { password: values.password, token: route.params.token }
      },
      update: (cache, { data }) => {
        if (!data?.changeForgotPassword) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { __typename: "Query", me: data.changeForgotPassword }
        });
      }
    });

    if (response) {
      if (response.data?.changeForgotPassword) {
        rootNavigation.navigate("Content");
      } else {
        setChangeForgotPasswordError(
          "Une erreur inconnue est arrivée. Merci de réessayer."
        );
      }
    }
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header
          label="Modifier son mot de passe"
          iconLeft={
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          }
          onIconLeftPress={() => navigation.goBack()}
        />

        <Formik
          initialValues={{
            password: "",
            confirmPassword: ""
          }}
          validationSchema={ChangeForgotPasswordSchema}
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
                label="Nouveau mot de passe"
                containerStyle={{ marginBottom: theme.spacing?.m }}
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
                errorMessage={
                  errors.password ?? "Utilisez au moins 8 caractères."
                }
                errorStyle={{
                  color: errors.password
                    ? theme.colors?.error
                    : theme.colors?.grey5
                }}
                autoCompleteType="password"
                secureTextEntry={!isPasswordVisible}
                returnKeyType="next"
                onSubmitEditing={() => secondInputRef.current?.focus()}
              />

              <Input
                ref={secondInputRef}
                label="Confirmer le mot de passe"
                containerStyle={{ marginBottom: theme.spacing?.m }}
                rightIcon={
                  <View style={{ flexDirection: "row" }}>
                    <ClearInputButton
                      value={values.confirmPassword}
                      onPress={() => setFieldValue("confirmPassword", "")}
                    />
                    <VisibilityInputButton
                      isVisible={isConfirmPasswordVisible}
                      onPress={() => setIsConfirmPasswordVisible((p) => !p)}
                    />
                  </View>
                }
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                errorMessage={errors.confirmPassword}
                autoCompleteType="password"
                secureTextEntry={!isConfirmPasswordVisible}
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
                  {changePasswordError}
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
                title="Modifier"
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

export default ChangeForgotPassword;

interface ChangeForgotPasswordProps {}
