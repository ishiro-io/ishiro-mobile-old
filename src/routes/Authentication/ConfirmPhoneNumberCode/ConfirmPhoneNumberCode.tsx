import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Dimensions, Image, View } from "react-native";
import {
  CodeField,
  Cursor,
  useClearByFocusCell
} from "react-native-confirmation-code-field";
import { Button, Text, ThemeContext } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";

import { DismissKeyboard, Header } from "components";
import {
  MeDocument,
  MeQuery,
  usePhoneAskConfirmationCodeMutation,
  usePhoneConnectMutation
} from "shared/graphql/generated";
import {
  AppNavigationProps,
  AuthenticationNavigationProps
} from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("window");

const ConfirmPhoneNumberCode: React.FC = () => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    AuthenticationNavigationProps<"ConfirmPhoneNumberCode">["navigation"]
  >();

  const rootNavigation = useNavigation<
    AppNavigationProps<"Authentication">["navigation"]
  >();

  const route = useRoute<
    AuthenticationNavigationProps<"ConfirmPhoneNumberCode">["route"]
  >();

  const [value, setValue] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });

  const [
    askConfirmationCode,
    { loading: askLoading }
  ] = usePhoneAskConfirmationCodeMutation({
    errorPolicy: "all"
  });

  const [connect, { loading: connectLoading }] = usePhoneConnectMutation();

  const onSubmit = async () => {
    const response = await connect({
      variables: {
        input: { phoneNumber: route.params.phoneNumber, code: value }
      },
      update: (cache, { data }) => {
        if (!data?.phoneConnect?.user) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { __typename: "Query", me: data.phoneConnect.user }
        });
      }
    });

    if (response) {
      if (response.data?.phoneConnect?.user) {
        rootNavigation.navigate("Content");
      } else if (response.data?.phoneConnect) {
        navigation.navigate("SetUsername", {
          type: "Phone",
          phoneNumber: route.params.phoneNumber,
          code: value
        });
      } else {
        setConfirmError("Code incorrect");
      }
    }
  };

  const onResendPress = async () => {
    await askConfirmationCode({
      variables: { input: { phoneNumber: route.params.phoneNumber } }
    });
  };

  return (
    <DismissKeyboard>
      <View style={{ flex: 1 }}>
        <Header label="Confirmation" justifyContent="center" />
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            paddingTop: theme.spacing?.s
          }}
        >
          <Image
            source={require("../../../assets/images/logo.png")}
            style={{
              height: 100,
              width: 100,
              resizeMode: "cover",
              marginBottom: theme.spacing?.m
            }}
          />

          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: 20,
              textAlign: "center",
              paddingHorizontal: theme.spacing?.xl,
              marginBottom: theme.spacing?.l
            }}
          >
            Inscrivez le code reçu par SMS
          </Text>

          <TouchableHighlight onPress={() => onResendPress()}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: theme.spacing?.xs
              }}
            >
              <Text
                style={{
                  fontFamily: "Poppins_300Light",
                  fontSize: 12,
                  color: theme.colors?.white
                }}
              >
                Vous n'avez rien reçu ?{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: 12,
                  color: theme.colors?.white
                }}
              >
                Recevoir un nouveau code
              </Text>
            </View>
          </TouchableHighlight>

          <CodeField
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={6}
            rootStyle={{ marginTop: 20 }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
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
              fontSize: 15,
              textTransform: "uppercase",
              textAlign: "center",
              letterSpacing: 1
            }}
            title="Continuer"
            loading={connectLoading || askLoading}
            loadingProps={{ color: theme.colors?.black }}
            onPress={() => onSubmit()}
          />

          <View style={{ height: 30 }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: 12,
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

export default ConfirmPhoneNumberCode;
