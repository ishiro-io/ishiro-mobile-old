import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

const Content: React.FC<ContentProps> = ({}: ContentProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Content</Text>
    </View>
  );
};

export default Content;

interface ContentProps {}
