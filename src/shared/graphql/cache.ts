import { InMemoryCache } from "@apollo/client";

import { TypedTypePolicies } from "shared/graphql/generated";

const typePolicies: TypedTypePolicies = {
  Query: {
    fields: {
      animes: {
        keyArgs: ["categoryId"],
        merge(existing, incoming, { args }) {
          if (args?.options?.offset === 0) return incoming;
          return existing
            ? {
                hasMore: incoming.hasMore,
                fields: [...existing.fields, ...incoming.fields]
              }
            : incoming;
        }
      },
      userAnimeViewsByStatus: {
        keyArgs: ["status"],
        merge(existing, incoming, { args }) {
          if (args?.options?.offset === 0) return incoming;
          return existing
            ? {
                hasMore: incoming.hasMore,
                fields: [...existing.fields, ...incoming.fields]
              }
            : incoming;
        }
      },
      userAnimeEpisodesStatus: {
        keyArgs: ["animeId"],
        merge(_, incoming) {
          return incoming;
        }
      }
    }
  }
};

const cache = new InMemoryCache({
  typePolicies
});

export default cache;
