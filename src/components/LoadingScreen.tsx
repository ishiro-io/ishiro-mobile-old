import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { ThemeContext } from "react-native-elements";

const LoadingScreen: React.FC<LoadingScreenProps> = ({}: LoadingScreenProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={theme.colors?.white} />
    </View>
  );
};

export default LoadingScreen;

interface LoadingScreenProps {}
