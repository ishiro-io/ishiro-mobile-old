import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { Button, ThemeContext } from "react-native-elements";
import { moderateScale } from "react-native-size-matters";

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
            alignItems: "center",
            justifyContent: "center",
            width: moderateScale(20),
            height: moderateScale(20)
          }}
          icon={
            <MaterialCommunityIcons
              name="close-circle"
              size={moderateScale(20)}
              color={theme.colors?.grey5}
            />
          }
          {...{ onPress }}
        />
      ) : (
        <View style={{ width: moderateScale(20), height: moderateScale(20) }} />
      )}
    </>
  );
};

export default ClearInputButton;

interface ClearInputButtonProps {
  value: string;
  onPress: () => void;
}
