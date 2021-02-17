import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Dimensions, View } from "react-native";
import { Button, Input, ThemeContext } from "react-native-elements";
import * as Yup from "yup";

import { ClearInputButton, DismissKeyboard, Header } from "components";
import {
  MeDocument,
  MeQuery,
  useUpdateUsernameMutation
} from "shared/graphql/generated";
import { ProfileSettingsNavigationProps } from "shared/navigation/NavigationProps";

const { width } = Dimensions.get("screen");

const ChangeUsernameSchema = Yup.object().shape({
  username: Yup.string().required("Votre nom d'utilisateur est requis")
});

const ChangeUsername: React.FC<ChangeUsernameProps> = ({}: ChangeUsernameProps) => {
  const { theme } = useContext(ThemeContext);

  const navigation = useNavigation<
    ProfileSettingsNavigationProps<"ChangeUsername">["navigation"]
  >();

  const [changeError, setChangeError] = useState<string | undefined>(undefined);

  const [updateUsername, { loading }] = useUpdateUsernameMutation({
    errorPolicy: "all"
  });

  const onSubmit = async (values: { username: string }) => {
    const response = await updateUsername({
      variables: { input: values },
      update: (cache, { data }) => {
        if (!data?.updateUsername) return;
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { __typename: "Query", me: data.updateUsername }
        });
      }
    });

    if (response) {
      if (response.data?.updateUsername) navigation.goBack();
      else setChangeError("Ce nom d'utilisateur est indisponible");
    }
  };

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1
        }}
      >
        <Header
          label="Modifier son nom d'utilisateur"
          iconLeft={
            <MaterialIcons name="keyboard-arrow-left" size={32} color="white" />
          }
          onIconLeftPress={() => navigation.goBack()}
        />

        <Formik
          initialValues={{
            username: ""
          }}
          validationSchema={ChangeUsernameSchema}
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
                  (errors.username || changeError) ??
                  "Il apparaîtra sur votre profil Ishiro et ne sera rien qu'à vous."
                }
                errorStyle={{
                  color:
                    errors.username || changeError
                      ? theme.colors?.error
                      : theme.colors?.grey5
                }}
                keyboardType="default"
                autoCompleteType="off"
                returnKeyType="done"
                blurOnSubmit={false}
                onSubmitEditing={() => handleSubmit()}
              />

              <Button
                type="solid"
                buttonStyle={{
                  backgroundColor: theme.colors?.white
                }}
                titleStyle={{
                  color: theme.colors?.black
                }}
                onPress={() => handleSubmit()}
                title="Enregistrer"
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

export default ChangeUsername;

interface ChangeUsernameProps {}
