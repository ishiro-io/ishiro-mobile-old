import { ApolloProvider } from "@apollo/client";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { client } from "shared/graphql";

const App = () => {
  return (
    <ApolloProvider {...{ client }}>
      <StatusBar style="dark" />
    </ApolloProvider>
  );
};

export default registerRootComponent(App);
