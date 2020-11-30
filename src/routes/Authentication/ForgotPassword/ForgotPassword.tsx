import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import { useForgotPasswordMutation } from "shared/graphql/generated";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

import { ForgotPasswordSchema } from "../shared/schemas";

const { width } = Dimensions.get("screen");

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}: ForgotPasswordProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"ForgotPassword">["navigation"]
  >();

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    errorPolicy: "all"
  });

  const onSubmit = async (values: { phoneNumber: string }) => {
    const response = await forgotPassword({
      variables: values
    });

    if (response) {
      if (response.data?.forgotPassword) {
        navigation.navigate("ConfirmPasswordCode", {
          phoneNumber: values.phoneNumber
        });
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
            phoneNumber: ""
          }}
          validationSchema={ForgotPasswordSchema}
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
                  errors.phoneNumber ??
                  "Un code vous sera envoyé par SMS pour modifier votre mot de passe."
                }
                errorStyle={{
                  color: errors.phoneNumber
                    ? theme.colors?.error
                    : theme.colors?.grey5
                }}
                keyboardType="phone-pad"
                autoCompleteType="off"
                returnKeyType="next"
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
                  fontSize: 18,
                  textTransform: "uppercase",
                  textAlign: "center",
                  letterSpacing: 1
                }}
                onPress={() => handleSubmit()}
                title="Suivant"
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

export default ForgotPassword;

interface ForgotPasswordProps {}
