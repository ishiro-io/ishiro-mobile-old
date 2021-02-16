import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useState } from "react";
import { Image, View } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from "react-native-confirmation-code-field";
import { Button, Text, ThemeContext } from "react-native-elements";
import { TouchableHighlight } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

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

const CELL_COUNT = 6;

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

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

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
              height: moderateScale(100),
              width: moderateScale(100),
              resizeMode: "cover",
              marginBottom: theme.spacing?.m
            }}
          />

          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: theme.textSize.m,
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
                  fontSize: theme.textSize.s,
                  color: theme.colors?.white
                }}
              >
                Vous n'avez rien reçu ?{" "}
              </Text>
              <Text
                style={{
                  fontFamily: "Poppins_500Medium",
                  fontSize: theme.textSize.s,
                  color: theme.colors?.white
                }}
              >
                Recevoir un nouveau code
              </Text>
            </View>
          </TouchableHighlight>

          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={{ marginTop: theme.spacing.l }}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            keyboardAppearance="dark"
            onSubmitEditing={() => onSubmit()}
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={{
                  width: moderateScale(50),
                  height: moderateScale(50),
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
                    fontSize: theme.textSize.l,
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
              backgroundColor: theme.colors?.white
            }}
            containerStyle={{
              marginTop: theme.spacing?.xl
            }}
            titleStyle={{
              color: theme.colors?.black
            }}
            title="Continuer"
            loading={connectLoading || askLoading}
            loadingProps={{ color: theme.colors?.black }}
            onPress={() => onSubmit()}
          />

          <View style={{ height: moderateVerticalScale(30) }}>
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                fontSize: theme.textSize.s,
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
