import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef } from "react";
import { TextInputProps as RNTextInputProps, View } from "react-native";
import { Input, Text, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ClearInputButton } from "components";

const SearchInput: React.FC<SearchInputProps> = ({
  isOpen,
  value,
  setIsOpen,
  setValue,
  ...rest
}: SearchInputProps) => {
  const { theme } = useContext(ThemeContext);

  const { top } = useSafeAreaInsets();

  const ref = useRef<Input>(null);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: isOpen ? top : 0,
        marginHorizontal: theme.spacing?.s,
        marginBottom: theme.spacing?.s
      }}
    >
      <View style={{ flexGrow: 1 }}>
        <Input
          ref={ref}
          {...rest}
          placeholder="Animes, films ou OAV"
          errorStyle={{ height: 0, margin: 0 }}
          inputContainerStyle={{
            backgroundColor: isOpen ? theme.colors?.grey9 : theme.colors?.white
          }}
          inputStyle={{
            color: isOpen ? theme.colors?.white : theme.colors?.black
          }}
          placeholderTextColor={theme.colors?.grey5}
          rightIcon={
            <ClearInputButton value={value} onPress={() => setValue("")} />
          }
          value={value}
          onChangeText={(text) => setValue(text)}
          keyboardType="default"
          autoCompleteType="off"
          returnKeyType="search"
          autoCorrect={false}
          blurOnSubmit={false}
          leftIcon={
            <MaterialIcons
              name="search"
              size={24}
              color={theme.colors?.grey5}
            />
          }
        />
      </View>

      {isOpen && (
        <TouchableWithoutFeedback
          onPress={() => {
            ref.current?.blur();
            ref.current?.clear();
            setValue("");
            setIsOpen(false);
          }}
        >
          <View
            style={{
              justifyContent: "center",
              marginRight: theme.spacing?.m,
              marginLeft: theme.spacing?.s
            }}
          >
            <Text
              style={{
                color: theme.colors?.white
              }}
            >
              Annuler
            </Text>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default SearchInput;

interface SearchInputProps extends RNTextInputProps {
  isOpen: boolean;
  value: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
