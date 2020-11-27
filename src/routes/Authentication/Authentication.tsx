import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

const Authentication: React.FC<AuthenticationProps> = ({}: AuthenticationProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Authentication</Text>
    </View>
  );
};

export default Authentication;

interface AuthenticationProps {}
