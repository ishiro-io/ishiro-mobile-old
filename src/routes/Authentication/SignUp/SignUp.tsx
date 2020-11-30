import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, Text, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import VisibilityInputButton from "components/VisiblityInputButton";
import { useRegisterMutation } from "shared/graphql/generated";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

import { SignUpSchema } from "../shared/schemas";

const { width } = Dimensions.get("screen");

const SignUp: React.FC<SignUpProps> = ({}: SignUpProps) => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<
    AuthenticationNavigationProps<"SignUp">["navigation"]
  >();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [registerError, setRegisterError] = useState("");

  const usernameRef = useRef<Input>(null);
  const phoneNumberRef = useRef<Input>(null);
  const passwordRef = useRef<Input>(null);

  const [register, { loading }] = useRegisterMutation({ errorPolicy: "all" });

  const onSubmit = async (values: {
    phoneNumber: string;
    username: string;
    password: string;
  }) => {
    const response = await register({
      variables: { input: values }
    });

    if (response) {
      if (response.data?.register)
        navigation.navigate("ConfirmPhoneNumberCode", {
          phoneNumber: values.phoneNumber
        });
      else
        setRegisterError(
          "Numéro de téléphone ou nom d'utilisateur indisponible"
        );
    }
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header
          label="Créer un compte"
          iconLeft={
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          }
          onIconLeftPress={() => navigation.goBack()}
        />

        <Formik
          initialValues={{
            phoneNumber: "",
            username: "",
            password: ""
          }}
          validationSchema={SignUpSchema}
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
                ref={usernameRef}
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
                autoCompleteType="username"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => phoneNumberRef.current?.focus()}
              />

              <Input
                ref={phoneNumberRef}
                label="Numéro de téléphone"
                containerStyle={{ marginBottom: theme.spacing?.m }}
                rightIcon={
                  <ClearInputButton
                    value={values.phoneNumber}
                    onPress={() => setFieldValue("phoneNumber", "")}
                  />
                }
                value={values.phoneNumber}
                onChangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                errorMessage={
                  errors.phoneNumber ??
                  "Vous devrez confirmer ce numéro par la suite."
                }
                errorStyle={{
                  color: errors.phoneNumber
                    ? theme.colors?.error
                    : theme.colors?.grey5
                }}
                keyboardType="phone-pad"
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />

              <Input
                ref={passwordRef}
                label="Mot de passe"
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
                  {registerError}
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
                title="S'inscrire"
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

export default SignUp;

interface SignUpProps {}
