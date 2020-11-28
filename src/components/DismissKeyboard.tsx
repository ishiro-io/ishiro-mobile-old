import React, { ReactElement } from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

const DismissKeyboard: React.FC<DismissKeyboardProps> = ({
  children
}: DismissKeyboardProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;

interface DismissKeyboardProps {
  children: ReactElement;
}
