import { ApolloClient } from "@apollo/client";
import Constants from "expo-constants";

import cache from "./cache";

const client = new ApolloClient({
  uri: Constants.manifest.extra.apiEndpoint,
  cache
});

export default client;
