import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell
} from "react-native-confirmation-code-field";
import { Button, Text, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { DismissKeyboard, Header } from "components";
import {
  ConfirmationCodeType,
  useCheckConfirmationCodeLazyQuery,
  useForgotPasswordMutation
} from "shared/graphql/generated";
import { AuthenticationNavigationProps } from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("window");

const ConfirmPasswordCode: React.FC<ConfirmPasswordCodeProps> = ({}: ConfirmPasswordCodeProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"ConfirmPasswordCode">["navigation"]
  >();

  const route = useRoute<
    AuthenticationNavigationProps<"ConfirmPasswordCode">["route"]
  >();

  const [value, setValue] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const [
    checkConfirmationCode,
    { data, loading }
  ] = useCheckConfirmationCodeLazyQuery({
    errorPolicy: "all"
  });

  const [
    forgotPassword,
    { loading: resendLoading }
  ] = useForgotPasswordMutation({
    errorPolicy: "all"
  });

  const onSubmit = async () => {
    await checkConfirmationCode({
      variables: { token: value, type: ConfirmationCodeType.Password }
    });
  };

  useEffect(() => {
    if (data) {
      if (data?.checkConfirmationCode) {
        navigation.navigate("ChangeForgotPassword", {
          token: value
        });
      } else {
        setConfirmError("Code incorrect");
      }
    }
  }, [data, navigation, value]);

  const onResendPress = async () => {
    await forgotPassword({
      variables: { phoneNumber: route.params.phoneNumber }
    });
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
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors?.black,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: theme.spacing?.l
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
              paddingHorizontal: theme.spacing?.m,
              marginBottom: theme.spacing?.xl,
              alignSelf: "flex-start"
            }}
          >
            Inscrivez le code reçu par SMS
          </Text>

          <View style={{ marginBottom: theme.spacing?.l }}>
            <CodeField
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={6}
              rootStyle={{ marginTop: 20 }}
              keyboardType="number-pad"
              keyboardAppearance="dark"
              textContentType="oneTimeCode"
              onSubmitEditing={() => onSubmit()}
              renderCell={({ index, symbol, isFocused }) => (
                <View
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    marginHorizontal: theme.spacing?.xs,
                    borderRadius: theme.borderRadii?.s,
                    backgroundColor: theme.colors?.white,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Poppins_500Medium",
                      fontSize: 24,
                      color: theme.colors?.black,
                      textAlign: "center"
                    }}
                    onLayout={getCellOnLayoutHandler(index)}
                  >
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: 12,
                color: theme.colors?.white,
                marginBottom: theme.spacing?.xl
              }}
            >
              Vous n'avez rien reçu ?{" "}
            </Text>
            <TouchableWithoutFeedback onPress={() => onResendPress()}>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 12,
                  color: theme.colors?.white
                }}
              >
                Recevoir un nouveau code
              </Text>
            </TouchableWithoutFeedback>
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
              marginTop: theme.spacing?.xl
            }}
            titleStyle={{
              color: theme.colors?.black,
              fontFamily: "Poppins_600SemiBold",
              fontSize: 18,
              textTransform: "uppercase",
              textAlign: "center",
              letterSpacing: 1
            }}
            title="Suivant"
            loading={loading || resendLoading}
            loadingProps={{ color: theme.colors?.black }}
            onPress={() => onSubmit()}
          />

          <View style={{ height: 30, alignItems: "center" }}>
            <Text
              style={{
                fontFamily: "Poppins_300Light",
                fontSize: 11,
                color: theme.colors?.error,
                marginTop: theme.spacing?.s
              }}
            >
              {confirmError}
            </Text>
          </View>
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ConfirmPasswordCode;

interface ConfirmPasswordCodeProps {}
