import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import { usePhoneAskConfirmationCodeMutation } from "shared/graphql/generated";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

import { ConnectSchema } from "../shared/schemas";

const { width } = Dimensions.get("screen");

const AskConfirmPhoneNumberCode: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<
    AuthenticationNavigationProps<"AskConfirmPhoneNumberCode">["navigation"]
  >();

  const [connectError, setConnectError] = useState<string | undefined>(
    undefined
  );

  const [
    askConfirmationCode,
    { loading }
  ] = usePhoneAskConfirmationCodeMutation({
    errorPolicy: "all"
  });

  const onSubmit = async (values: { phoneNumber: string }) => {
    const response = await askConfirmationCode({
      variables: { input: values }
    });

    if (response) {
      if (response.data?.phoneAskConfirmationCode) {
        navigation.navigate("ConfirmPhoneNumberCode", {
          phoneNumber: values.phoneNumber
        });
      } else {
        const badPhoneNumber = response.errors?.find(
          (e) =>
            e.extensions!.exception.response.message[0] ===
            "phoneNumber must be a phone number"
        );

        if (badPhoneNumber) {
          setConnectError("Votre numéro de téléphone est erroné.");
        } else {
          setConnectError("Erreur inconnue. Merci de contacter le support.");
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
            phoneNumber: ""
          }}
          validationSchema={ConnectSchema}
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
                  (errors.phoneNumber || connectError) ??
                  "Il vous servira d'identifiant pour accéder à votre compte Ishiro."
                }
                errorStyle={{
                  color:
                    errors.phoneNumber || connectError
                      ? theme.colors?.error
                      : theme.colors?.grey5
                }}
                keyboardType="phone-pad"
                autoCompleteType="tel"
                returnKeyType="done"
                blurOnSubmit={false}
                onSubmitEditing={() => handleSubmit()}
              />

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
                  fontSize: 15,
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: 1
                }}
                onPress={() => handleSubmit()}
                title="Recevoir mon code"
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

export default AskConfirmPhoneNumberCode;
