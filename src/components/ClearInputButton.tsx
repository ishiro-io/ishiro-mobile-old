import { isNonEmptyArray } from "@apollo/client/utilities";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

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
          containerStyle={{
            marginBottom: 0
          }}
          icon={
            <MaterialCommunityIcons
              name="close-circle"
              size={RFPercentage(3)}
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
