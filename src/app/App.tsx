import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#131313"
  }
});

export default registerRootComponent(App);
