import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";

const ClearInputButton: React.FC<ClearInputButtonProps> = ({
  value,
  onPress
}: ClearInputButtonProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {value !== "" ? (
        <Button
          type="clear"
          icon={
            <MaterialCommunityIcons
              name="close-circle"
              size={20}
              color={theme.colors?.grey5}
            />
          }
          {...{ onPress }}
        />
      ) : (
        <View style={{ width: 20, height: 20 }} />
      )}
    </>
  );
};

export default ClearInputButton;

interface ClearInputButtonProps {
  value: string;
  onPress: () => void;
}
