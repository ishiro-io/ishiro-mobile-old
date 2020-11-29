import { InMemoryCache } from "@apollo/client";

import { TypedTypePolicies } from "shared/graphql/generated";

const typePolicies: TypedTypePolicies = {};

const cache = new InMemoryCache({
  typePolicies
});

export default cache;
