import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { Button, ThemeContext } from "react-native-elements";

const VisibilityInputButton: React.FC<VisibilityInputButtonProps> = ({
  isVisible,
  onPress
}: VisibilityInputButtonProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Button
      type="clear"
      icon={
        <MaterialIcons
          name={isVisible ? "visibility" : "visibility-off"}
          size={20}
          color={theme.colors?.grey5}
        />
      }
      {...{ onPress }}
    />
  );
};

export default VisibilityInputButton;

interface VisibilityInputButtonProps {
  isVisible: boolean;
  onPress: () => void;
}
