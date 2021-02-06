import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies
} from "@apollo/client/cache";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export const namedOperations = {
  Query: {
    animeAdditionalInfo: "animeAdditionalInfo",
    animeData: "animeData",
    animes: "animes",
    searchAnimes: "searchAnimes",
    me: "me",
    categories: "categories",
    episodes: "episodes",
    homeAnimes: "homeAnimes",
    userAnimeView: "userAnimeView",
    userAnimeViewsByStatus: "userAnimeViewsByStatus",
    userAnimeEpisodesStatus: "userAnimeEpisodesStatus"
  },
  Mutation: {
    googleConnect: "googleConnect",
    googleRegister: "googleRegister",
    logout: "logout",
    phoneAskConfirmationCode: "phoneAskConfirmationCode",
    phoneConnect: "phoneConnect",
    phoneRegister: "phoneRegister",
    updateUsername: "updateUsername",
    setUserAnimeViewStatus: "setUserAnimeViewStatus",
    setUserAnimeEpisodesStatus: "setUserAnimeEpisodesStatus"
  },
  Fragment: {
    AnimeAdditionalInformationsFields: "AnimeAdditionalInformationsFields",
    AnimeDataFields: "AnimeDataFields",
    AnimeFields: "AnimeFields",
    ArcFields: "ArcFields",
    CategoryFields: "CategoryFields",
    CategoryPreviewFields: "CategoryPreviewFields",
    EpisodeFields: "EpisodeFields",
    UserFields: "UserFields",
    UserAnimeViewFields: "UserAnimeViewFields",
    EpisodeWithStatusFields: "EpisodeWithStatusFields",
    UserEpisodeViewFields: "UserEpisodeViewFields"
  }
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Anime = {
  __typename?: "Anime";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  idMAL: Scalars["Float"];
  title: Scalars["String"];
  titleEnglish?: Maybe<Scalars["String"]>;
  titleJapanese?: Maybe<Scalars["String"]>;
  bannerImage?: Maybe<Scalars["String"]>;
  posterImage?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  MALRating?: Maybe<Scalars["Float"]>;
  type: AnimeType;
  status: AnimeStatus;
  releaseDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  editor?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["String"]>;
  isAdult: Scalars["Boolean"];
  categories: Array<Category>;
  episodes: Array<Episode>;
  episodeCount: Scalars["Int"];
  arcs?: Maybe<Array<Arc>>;
};

export enum AnimeType {
  Tv = "TV",
  TvSpecial = "TV_SPECIAL",
  Movie = "MOVIE",
  Ova = "OVA",
  Ona = "ONA",
  Music = "MUSIC"
}

export enum AnimeStatus {
  ComingSoon = "COMING_SOON",
  Ongoing = "ONGOING",
  Finished = "FINISHED",
  Cancelled = "CANCELLED"
}

export type Category = {
  __typename?: "Category";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name: Scalars["String"];
  coverImage?: Maybe<Scalars["String"]>;
  animes: Array<Anime>;
};

export type Episode = {
  __typename?: "Episode";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  title?: Maybe<Scalars["String"]>;
  number: Scalars["Float"];
  arcName?: Maybe<Scalars["String"]>;
  airedDate?: Maybe<Scalars["String"]>;
  isFiller: Scalars["Boolean"];
  isRecap: Scalars["Boolean"];
  anime: Anime;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type UserAnimeView = {
  __typename?: "UserAnimeView";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  status: AnimeViewStatus;
  anime: Anime;
  user: User;
  episodeViews: Array<UserEpisodeView>;
  lastEpisodeSeen?: Maybe<Episode>;
  nextEpisodeToSee?: Maybe<Episode>;
};

export enum AnimeViewStatus {
  None = "NONE",
  InProgress = "IN_PROGRESS",
  ToSee = "TO_SEE",
  Finished = "FINISHED",
  Abandoned = "ABANDONED"
}

export type UserEpisodeView = {
  __typename?: "UserEpisodeView";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  hasBeenSeen?: Maybe<Scalars["Boolean"]>;
  episode: Episode;
  animeView: UserAnimeView;
};

export type CategoryPreview = {
  __typename?: "CategoryPreview";
  id: Scalars["Float"];
  name: Scalars["String"];
  animes: Array<Anime>;
};

export type AnimesOutput = {
  __typename?: "AnimesOutput";
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
  fields: Array<Anime>;
};

export type Arc = {
  __typename?: "Arc";
  title?: Maybe<Scalars["String"]>;
  firstEpisodeNumber: Scalars["Float"];
  lastEpisodeNumber: Scalars["Float"];
};

export type GoogleConnectOutput = {
  __typename?: "GoogleConnectOutput";
  user?: Maybe<User>;
};

export type PhoneConnectOutput = {
  __typename?: "PhoneConnectOutput";
  user?: Maybe<User>;
};

export type UserAnimeViewsByStatusOutput = {
  __typename?: "UserAnimeViewsByStatusOutput";
  hasMore: Scalars["Boolean"];
  total: Scalars["Int"];
  fields: Array<UserAnimeView>;
};

export type EpisodeWithStatus = {
  __typename?: "EpisodeWithStatus";
  episode: Episode;
  view?: Maybe<UserEpisodeView>;
};

export type Query = {
  __typename?: "Query";
  anime?: Maybe<Anime>;
  animes: AnimesOutput;
  searchAnimes?: Maybe<AnimesOutput>;
  category?: Maybe<Category>;
  categories: Array<Category>;
  categoryPreview?: Maybe<CategoryPreview>;
  episode?: Maybe<Episode>;
  episodes: Array<Episode>;
  me?: Maybe<User>;
  userAnimeViewsByStatus?: Maybe<UserAnimeViewsByStatusOutput>;
  userAnimeView?: Maybe<UserAnimeView>;
  userAnimeEpisodesStatus?: Maybe<Array<EpisodeWithStatus>>;
};

export type QueryAnimeArgs = {
  id: Scalars["Float"];
};

export type QueryAnimesArgs = {
  categoryId?: Maybe<Scalars["Float"]>;
  options?: Maybe<PaginationInput>;
};

export type QuerySearchAnimesArgs = {
  input: SearchAnimesInput;
  options?: Maybe<PaginationInput>;
};

export type QueryCategoryArgs = {
  id: Scalars["Int"];
};

export type QueryCategoryPreviewArgs = {
  id: Scalars["Int"];
};

export type QueryEpisodeArgs = {
  id: Scalars["Int"];
};

export type QueryEpisodesArgs = {
  animeId: Scalars["Float"];
};

export type QueryUserAnimeViewsByStatusArgs = {
  status: AnimeViewStatus;
  options?: Maybe<PaginationInput>;
};

export type QueryUserAnimeViewArgs = {
  animeId: Scalars["Float"];
};

export type QueryUserAnimeEpisodesStatusArgs = {
  animeId: Scalars["Float"];
};

export type PaginationInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
};

export type SearchAnimesInput = {
  textSearchField: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  logout: Scalars["Boolean"];
  phoneAskConfirmationCode: Scalars["Boolean"];
  phoneConnect?: Maybe<PhoneConnectOutput>;
  phoneRegister: User;
  googleConnect?: Maybe<GoogleConnectOutput>;
  googleRegister: User;
  updateUsername?: Maybe<User>;
  setUserAnimeViewStatus?: Maybe<UserAnimeView>;
  setUserAnimeEpisodesStatus?: Maybe<Array<UserEpisodeView>>;
};

export type MutationPhoneAskConfirmationCodeArgs = {
  input: PhoneAskConfirmationCodeInput;
};

export type MutationPhoneConnectArgs = {
  input: PhoneConnectInput;
};

export type MutationPhoneRegisterArgs = {
  input: PhoneRegisterInput;
};

export type MutationGoogleConnectArgs = {
  input: GoogleConnectInput;
};

export type MutationGoogleRegisterArgs = {
  input: GoogleRegisterInput;
};

export type MutationUpdateUsernameArgs = {
  input: UpdateUsernameInput;
};

export type MutationSetUserAnimeViewStatusArgs = {
  status: AnimeViewStatus;
  animeId: Scalars["Float"];
};

export type MutationSetUserAnimeEpisodesStatusArgs = {
  input: SetUserAnimeEpisodesStatusInput;
};

export type PhoneAskConfirmationCodeInput = {
  phoneNumber: Scalars["String"];
};

export type PhoneConnectInput = {
  phoneNumber: Scalars["String"];
  code: Scalars["String"];
};

export type PhoneRegisterInput = {
  phoneNumber: Scalars["String"];
  username: Scalars["String"];
  code: Scalars["String"];
};

export type GoogleConnectInput = {
  accountId: Scalars["String"];
};

export type GoogleRegisterInput = {
  accountId: Scalars["String"];
  username: Scalars["String"];
};

export type UpdateUsernameInput = {
  username: Scalars["String"];
};

export type SetUserAnimeEpisodesStatusInput = {
  animeId: Scalars["Float"];
  newEpisodeViews: Array<NewEpisodeView>;
};

export type NewEpisodeView = {
  episodeNumber: Scalars["Float"];
  toSeen: Scalars["Boolean"];
};

export type AnimeAdditionalInformationsFieldsFragment = {
  __typename?: "Anime";
} & Pick<
  Anime,
  | "id"
  | "description"
  | "type"
  | "status"
  | "releaseDate"
  | "endDate"
  | "duration"
> & {
    categories: Array<
      { __typename?: "Category" } & Pick<Category, "id" | "name">
    >;
  };

export type AnimeDataFieldsFragment = { __typename?: "Anime" } & Pick<
  Anime,
  | "id"
  | "title"
  | "titleJapanese"
  | "bannerImage"
  | "posterImage"
  | "description"
  | "type"
  | "episodeCount"
> & {
    categories: Array<
      { __typename?: "Category" } & Pick<Category, "id" | "name">
    >;
    arcs?: Maybe<
      Array<
        { __typename?: "Arc" } & Pick<
          Arc,
          "title" | "firstEpisodeNumber" | "lastEpisodeNumber"
        >
      >
    >;
  };

export type AnimeFieldsFragment = { __typename?: "Anime" } & Pick<
  Anime,
  "id" | "title" | "posterImage"
> & { arcs?: Maybe<Array<{ __typename?: "Arc" } & ArcFieldsFragment>> };

export type ArcFieldsFragment = { __typename?: "Arc" } & Pick<
  Arc,
  "title" | "firstEpisodeNumber" | "lastEpisodeNumber"
>;

export type AnimeAdditionalInfoQueryVariables = Exact<{
  id: Scalars["Float"];
}>;

export type AnimeAdditionalInfoQuery = { __typename?: "Query" } & {
  anime?: Maybe<
    { __typename?: "Anime" } & AnimeAdditionalInformationsFieldsFragment
  >;
};

export type AnimeDataQueryVariables = Exact<{
  id: Scalars["Float"];
}>;

export type AnimeDataQuery = { __typename?: "Query" } & {
  anime?: Maybe<{ __typename?: "Anime" } & AnimeDataFieldsFragment>;
};

export type AnimesQueryVariables = Exact<{
  categoryId?: Maybe<Scalars["Float"]>;
  options?: Maybe<PaginationInput>;
}>;

export type AnimesQuery = { __typename?: "Query" } & {
  animes: { __typename?: "AnimesOutput" } & Pick<AnimesOutput, "hasMore"> & {
      fields: Array<{ __typename?: "Anime" } & AnimeFieldsFragment>;
    };
};

export type SearchAnimesQueryVariables = Exact<{
  input: SearchAnimesInput;
  options?: Maybe<PaginationInput>;
}>;

export type SearchAnimesQuery = { __typename?: "Query" } & {
  searchAnimes?: Maybe<
    { __typename?: "AnimesOutput" } & Pick<AnimesOutput, "hasMore"> & {
        fields: Array<{ __typename?: "Anime" } & AnimeFieldsFragment>;
      }
  >;
};

export type GoogleConnectMutationVariables = Exact<{
  input: GoogleConnectInput;
}>;

export type GoogleConnectMutation = { __typename?: "Mutation" } & {
  googleConnect?: Maybe<
    { __typename?: "GoogleConnectOutput" } & {
      user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
    }
  >;
};

export type GoogleRegisterMutationVariables = Exact<{
  input: GoogleRegisterInput;
}>;

export type GoogleRegisterMutation = { __typename?: "Mutation" } & {
  googleRegister: { __typename?: "User" } & UserFieldsFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "logout"
>;

export type PhoneAskConfirmationCodeMutationVariables = Exact<{
  input: PhoneAskConfirmationCodeInput;
}>;

export type PhoneAskConfirmationCodeMutation = {
  __typename?: "Mutation";
} & Pick<Mutation, "phoneAskConfirmationCode">;

export type PhoneConnectMutationVariables = Exact<{
  input: PhoneConnectInput;
}>;

export type PhoneConnectMutation = { __typename?: "Mutation" } & {
  phoneConnect?: Maybe<
    { __typename?: "PhoneConnectOutput" } & {
      user?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
    }
  >;
};

export type PhoneRegisterMutationVariables = Exact<{
  input: PhoneRegisterInput;
}>;

export type PhoneRegisterMutation = { __typename?: "Mutation" } & {
  phoneRegister: { __typename?: "User" } & UserFieldsFragment;
};

export type UpdateUsernameMutationVariables = Exact<{
  input: UpdateUsernameInput;
}>;

export type UpdateUsernameMutation = { __typename?: "Mutation" } & {
  updateUsername?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type CategoryFieldsFragment = { __typename?: "Category" } & Pick<
  Category,
  "id" | "name" | "coverImage"
>;

export type CategoryPreviewFieldsFragment = {
  __typename?: "CategoryPreview";
} & Pick<CategoryPreview, "id" | "name"> & {
    animes: Array<{ __typename?: "Anime" } & AnimeFieldsFragment>;
  };

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Array<{ __typename?: "Category" } & CategoryFieldsFragment>;
};

export type EpisodeFieldsFragment = { __typename?: "Episode" } & Pick<
  Episode,
  "id" | "number" | "title" | "airedDate" | "arcName" | "isFiller" | "isRecap"
>;

export type EpisodesQueryVariables = Exact<{
  animeId: Scalars["Float"];
}>;

export type EpisodesQuery = { __typename?: "Query" } & {
  episodes: Array<{ __typename?: "Episode" } & EpisodeFieldsFragment>;
};

export type HomeAnimesQueryVariables = Exact<{ [key: string]: never }>;

export type HomeAnimesQuery = { __typename?: "Query" } & {
  action?: Maybe<
    { __typename?: "CategoryPreview" } & CategoryPreviewFieldsFragment
  >;
  romance?: Maybe<
    { __typename?: "CategoryPreview" } & CategoryPreviewFieldsFragment
  >;
  comedie?: Maybe<
    { __typename?: "CategoryPreview" } & CategoryPreviewFieldsFragment
  >;
  drame?: Maybe<
    { __typename?: "CategoryPreview" } & CategoryPreviewFieldsFragment
  >;
  sf?: Maybe<
    { __typename?: "CategoryPreview" } & CategoryPreviewFieldsFragment
  >;
  userAnimeViewsByStatus?: Maybe<
    { __typename?: "UserAnimeViewsByStatusOutput" } & Pick<
      UserAnimeViewsByStatusOutput,
      "hasMore" | "total"
    > & {
        fields: Array<
          { __typename?: "UserAnimeView" } & UserAnimeViewFieldsFragment
        >;
      }
  >;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username"
>;

export type UserAnimeViewFieldsFragment = {
  __typename?: "UserAnimeView";
} & Pick<UserAnimeView, "id" | "status"> & {
    anime: { __typename?: "Anime" } & Pick<
      Anime,
      "id" | "title" | "posterImage"
    >;
    episodeViews: Array<
      { __typename?: "UserEpisodeView" } & Pick<
        UserEpisodeView,
        "hasBeenSeen"
      > & { episode: { __typename?: "Episode" } & Pick<Episode, "number"> }
    >;
    nextEpisodeToSee?: Maybe<
      { __typename?: "Episode" } & Pick<Episode, "number">
    >;
    lastEpisodeSeen?: Maybe<
      { __typename?: "Episode" } & Pick<Episode, "number">
    >;
  };

export type SetUserAnimeViewStatusMutationVariables = Exact<{
  status: AnimeViewStatus;
  animeId: Scalars["Float"];
}>;

export type SetUserAnimeViewStatusMutation = { __typename?: "Mutation" } & {
  setUserAnimeViewStatus?: Maybe<
    { __typename?: "UserAnimeView" } & UserAnimeViewFieldsFragment
  >;
};

export type UserAnimeViewQueryVariables = Exact<{
  animeId: Scalars["Float"];
}>;

export type UserAnimeViewQuery = { __typename?: "Query" } & {
  userAnimeView?: Maybe<
    { __typename?: "UserAnimeView" } & UserAnimeViewFieldsFragment
  >;
};

export type UserAnimeViewsByStatusQueryVariables = Exact<{
  status: AnimeViewStatus;
  options?: Maybe<PaginationInput>;
}>;

export type UserAnimeViewsByStatusQuery = { __typename?: "Query" } & {
  userAnimeViewsByStatus?: Maybe<
    { __typename?: "UserAnimeViewsByStatusOutput" } & Pick<
      UserAnimeViewsByStatusOutput,
      "hasMore" | "total"
    > & {
        fields: Array<
          { __typename?: "UserAnimeView" } & UserAnimeViewFieldsFragment
        >;
      }
  >;
};

export type EpisodeWithStatusFieldsFragment = {
  __typename?: "EpisodeWithStatus";
} & {
  episode: { __typename?: "Episode" } & EpisodeFieldsFragment;
  view?: Maybe<
    { __typename?: "UserEpisodeView" } & UserEpisodeViewFieldsFragment
  >;
};

export type UserEpisodeViewFieldsFragment = {
  __typename?: "UserEpisodeView";
} & Pick<UserEpisodeView, "hasBeenSeen"> & {
    episode: { __typename?: "Episode" } & Pick<Episode, "number">;
    animeView: { __typename?: "UserAnimeView" } & Pick<UserAnimeView, "id">;
  };

export type SetUserAnimeEpisodesStatusMutationVariables = Exact<{
  input: SetUserAnimeEpisodesStatusInput;
}>;

export type SetUserAnimeEpisodesStatusMutation = { __typename?: "Mutation" } & {
  setUserAnimeEpisodesStatus?: Maybe<
    Array<{ __typename?: "UserEpisodeView" } & UserEpisodeViewFieldsFragment>
  >;
};

export type UserAnimeEpisodesStatusQueryVariables = Exact<{
  animeId: Scalars["Float"];
}>;

export type UserAnimeEpisodesStatusQuery = { __typename?: "Query" } & {
  userAnimeEpisodesStatus?: Maybe<
    Array<
      { __typename?: "EpisodeWithStatus" } & EpisodeWithStatusFieldsFragment
    >
  >;
};

export const AnimeAdditionalInformationsFieldsFragmentDoc = gql`
  fragment AnimeAdditionalInformationsFields on Anime {
    id
    description
    type
    status
    releaseDate
    endDate
    duration
    categories {
      id
      name
    }
  }
`;
export const AnimeDataFieldsFragmentDoc = gql`
  fragment AnimeDataFields on Anime {
    id
    title
    titleJapanese
    bannerImage
    posterImage
    description
    type
    episodeCount
    categories {
      id
      name
    }
    arcs {
      title
      firstEpisodeNumber
      lastEpisodeNumber
    }
  }
`;
export const CategoryFieldsFragmentDoc = gql`
  fragment CategoryFields on Category {
    id
    name
    coverImage
  }
`;
export const ArcFieldsFragmentDoc = gql`
  fragment ArcFields on Arc {
    title
    firstEpisodeNumber
    lastEpisodeNumber
  }
`;
export const AnimeFieldsFragmentDoc = gql`
  fragment AnimeFields on Anime {
    id
    title
    posterImage
    arcs {
      ...ArcFields
    }
  }
  ${ArcFieldsFragmentDoc}
`;
export const CategoryPreviewFieldsFragmentDoc = gql`
  fragment CategoryPreviewFields on CategoryPreview {
    id
    name
    animes {
      ...AnimeFields
    }
  }
  ${AnimeFieldsFragmentDoc}
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    username
  }
`;
export const UserAnimeViewFieldsFragmentDoc = gql`
  fragment UserAnimeViewFields on UserAnimeView {
    id
    status
    anime {
      id
      title
      posterImage
    }
    episodeViews {
      hasBeenSeen
      episode {
        number
      }
    }
    nextEpisodeToSee {
      number
    }
    lastEpisodeSeen {
      number
    }
  }
`;
export const EpisodeFieldsFragmentDoc = gql`
  fragment EpisodeFields on Episode {
    id
    number
    title
    airedDate
    arcName
    isFiller
    isRecap
  }
`;
export const UserEpisodeViewFieldsFragmentDoc = gql`
  fragment UserEpisodeViewFields on UserEpisodeView {
    hasBeenSeen
    episode {
      number
    }
    animeView {
      id
    }
  }
`;
export const EpisodeWithStatusFieldsFragmentDoc = gql`
  fragment EpisodeWithStatusFields on EpisodeWithStatus {
    episode {
      ...EpisodeFields
    }
    view {
      ...UserEpisodeViewFields
    }
  }
  ${EpisodeFieldsFragmentDoc}
  ${UserEpisodeViewFieldsFragmentDoc}
`;
export const AnimeAdditionalInfoDocument = gql`
  query animeAdditionalInfo($id: Float!) {
    anime(id: $id) {
      ...AnimeAdditionalInformationsFields
    }
  }
  ${AnimeAdditionalInformationsFieldsFragmentDoc}
`;

/**
 * __useAnimeAdditionalInfoQuery__
 *
 * To run a query within a React component, call `useAnimeAdditionalInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimeAdditionalInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimeAdditionalInfoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnimeAdditionalInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AnimeAdditionalInfoQuery,
    AnimeAdditionalInfoQueryVariables
  >
) {
  return Apollo.useQuery<
    AnimeAdditionalInfoQuery,
    AnimeAdditionalInfoQueryVariables
  >(AnimeAdditionalInfoDocument, baseOptions);
}
export function useAnimeAdditionalInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AnimeAdditionalInfoQuery,
    AnimeAdditionalInfoQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    AnimeAdditionalInfoQuery,
    AnimeAdditionalInfoQueryVariables
  >(AnimeAdditionalInfoDocument, baseOptions);
}
export type AnimeAdditionalInfoQueryHookResult = ReturnType<
  typeof useAnimeAdditionalInfoQuery
>;
export type AnimeAdditionalInfoLazyQueryHookResult = ReturnType<
  typeof useAnimeAdditionalInfoLazyQuery
>;
export type AnimeAdditionalInfoQueryResult = Apollo.QueryResult<
  AnimeAdditionalInfoQuery,
  AnimeAdditionalInfoQueryVariables
>;
export const AnimeDataDocument = gql`
  query animeData($id: Float!) {
    anime(id: $id) {
      ...AnimeDataFields
    }
  }
  ${AnimeDataFieldsFragmentDoc}
`;

/**
 * __useAnimeDataQuery__
 *
 * To run a query within a React component, call `useAnimeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimeDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAnimeDataQuery(
  baseOptions?: Apollo.QueryHookOptions<AnimeDataQuery, AnimeDataQueryVariables>
) {
  return Apollo.useQuery<AnimeDataQuery, AnimeDataQueryVariables>(
    AnimeDataDocument,
    baseOptions
  );
}
export function useAnimeDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AnimeDataQuery,
    AnimeDataQueryVariables
  >
) {
  return Apollo.useLazyQuery<AnimeDataQuery, AnimeDataQueryVariables>(
    AnimeDataDocument,
    baseOptions
  );
}
export type AnimeDataQueryHookResult = ReturnType<typeof useAnimeDataQuery>;
export type AnimeDataLazyQueryHookResult = ReturnType<
  typeof useAnimeDataLazyQuery
>;
export type AnimeDataQueryResult = Apollo.QueryResult<
  AnimeDataQuery,
  AnimeDataQueryVariables
>;
export const AnimesDocument = gql`
  query animes($categoryId: Float, $options: PaginationInput) {
    animes(categoryId: $categoryId, options: $options) {
      hasMore
      fields {
        ...AnimeFields
      }
    }
  }
  ${AnimeFieldsFragmentDoc}
`;

/**
 * __useAnimesQuery__
 *
 * To run a query within a React component, call `useAnimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimesQuery({
 *   variables: {
 *      categoryId: // value for 'categoryId'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useAnimesQuery(
  baseOptions?: Apollo.QueryHookOptions<AnimesQuery, AnimesQueryVariables>
) {
  return Apollo.useQuery<AnimesQuery, AnimesQueryVariables>(
    AnimesDocument,
    baseOptions
  );
}
export function useAnimesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AnimesQuery, AnimesQueryVariables>
) {
  return Apollo.useLazyQuery<AnimesQuery, AnimesQueryVariables>(
    AnimesDocument,
    baseOptions
  );
}
export type AnimesQueryHookResult = ReturnType<typeof useAnimesQuery>;
export type AnimesLazyQueryHookResult = ReturnType<typeof useAnimesLazyQuery>;
export type AnimesQueryResult = Apollo.QueryResult<
  AnimesQuery,
  AnimesQueryVariables
>;
export const SearchAnimesDocument = gql`
  query searchAnimes($input: SearchAnimesInput!, $options: PaginationInput) {
    searchAnimes(input: $input, options: $options) {
      hasMore
      fields {
        ...AnimeFields
      }
    }
  }
  ${AnimeFieldsFragmentDoc}
`;

/**
 * __useSearchAnimesQuery__
 *
 * To run a query within a React component, call `useSearchAnimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAnimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAnimesQuery({
 *   variables: {
 *      input: // value for 'input'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchAnimesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchAnimesQuery,
    SearchAnimesQueryVariables
  >
) {
  return Apollo.useQuery<SearchAnimesQuery, SearchAnimesQueryVariables>(
    SearchAnimesDocument,
    baseOptions
  );
}
export function useSearchAnimesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchAnimesQuery,
    SearchAnimesQueryVariables
  >
) {
  return Apollo.useLazyQuery<SearchAnimesQuery, SearchAnimesQueryVariables>(
    SearchAnimesDocument,
    baseOptions
  );
}
export type SearchAnimesQueryHookResult = ReturnType<
  typeof useSearchAnimesQuery
>;
export type SearchAnimesLazyQueryHookResult = ReturnType<
  typeof useSearchAnimesLazyQuery
>;
export type SearchAnimesQueryResult = Apollo.QueryResult<
  SearchAnimesQuery,
  SearchAnimesQueryVariables
>;
export const GoogleConnectDocument = gql`
  mutation googleConnect($input: GoogleConnectInput!) {
    googleConnect(input: $input) {
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type GoogleConnectMutationFn = Apollo.MutationFunction<
  GoogleConnectMutation,
  GoogleConnectMutationVariables
>;

/**
 * __useGoogleConnectMutation__
 *
 * To run a mutation, you first call `useGoogleConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleConnectMutation, { data, loading, error }] = useGoogleConnectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGoogleConnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GoogleConnectMutation,
    GoogleConnectMutationVariables
  >
) {
  return Apollo.useMutation<
    GoogleConnectMutation,
    GoogleConnectMutationVariables
  >(GoogleConnectDocument, baseOptions);
}
export type GoogleConnectMutationHookResult = ReturnType<
  typeof useGoogleConnectMutation
>;
export type GoogleConnectMutationResult = Apollo.MutationResult<GoogleConnectMutation>;
export type GoogleConnectMutationOptions = Apollo.BaseMutationOptions<
  GoogleConnectMutation,
  GoogleConnectMutationVariables
>;
export const GoogleRegisterDocument = gql`
  mutation googleRegister($input: GoogleRegisterInput!) {
    googleRegister(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type GoogleRegisterMutationFn = Apollo.MutationFunction<
  GoogleRegisterMutation,
  GoogleRegisterMutationVariables
>;

/**
 * __useGoogleRegisterMutation__
 *
 * To run a mutation, you first call `useGoogleRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoogleRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [googleRegisterMutation, { data, loading, error }] = useGoogleRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGoogleRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GoogleRegisterMutation,
    GoogleRegisterMutationVariables
  >
) {
  return Apollo.useMutation<
    GoogleRegisterMutation,
    GoogleRegisterMutationVariables
  >(GoogleRegisterDocument, baseOptions);
}
export type GoogleRegisterMutationHookResult = ReturnType<
  typeof useGoogleRegisterMutation
>;
export type GoogleRegisterMutationResult = Apollo.MutationResult<GoogleRegisterMutation>;
export type GoogleRegisterMutationOptions = Apollo.BaseMutationOptions<
  GoogleRegisterMutation,
  GoogleRegisterMutationVariables
>;
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    baseOptions
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const PhoneAskConfirmationCodeDocument = gql`
  mutation phoneAskConfirmationCode($input: PhoneAskConfirmationCodeInput!) {
    phoneAskConfirmationCode(input: $input)
  }
`;
export type PhoneAskConfirmationCodeMutationFn = Apollo.MutationFunction<
  PhoneAskConfirmationCodeMutation,
  PhoneAskConfirmationCodeMutationVariables
>;

/**
 * __usePhoneAskConfirmationCodeMutation__
 *
 * To run a mutation, you first call `usePhoneAskConfirmationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhoneAskConfirmationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [phoneAskConfirmationCodeMutation, { data, loading, error }] = usePhoneAskConfirmationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePhoneAskConfirmationCodeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PhoneAskConfirmationCodeMutation,
    PhoneAskConfirmationCodeMutationVariables
  >
) {
  return Apollo.useMutation<
    PhoneAskConfirmationCodeMutation,
    PhoneAskConfirmationCodeMutationVariables
  >(PhoneAskConfirmationCodeDocument, baseOptions);
}
export type PhoneAskConfirmationCodeMutationHookResult = ReturnType<
  typeof usePhoneAskConfirmationCodeMutation
>;
export type PhoneAskConfirmationCodeMutationResult = Apollo.MutationResult<PhoneAskConfirmationCodeMutation>;
export type PhoneAskConfirmationCodeMutationOptions = Apollo.BaseMutationOptions<
  PhoneAskConfirmationCodeMutation,
  PhoneAskConfirmationCodeMutationVariables
>;
export const PhoneConnectDocument = gql`
  mutation phoneConnect($input: PhoneConnectInput!) {
    phoneConnect(input: $input) {
      user {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type PhoneConnectMutationFn = Apollo.MutationFunction<
  PhoneConnectMutation,
  PhoneConnectMutationVariables
>;

/**
 * __usePhoneConnectMutation__
 *
 * To run a mutation, you first call `usePhoneConnectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhoneConnectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [phoneConnectMutation, { data, loading, error }] = usePhoneConnectMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePhoneConnectMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PhoneConnectMutation,
    PhoneConnectMutationVariables
  >
) {
  return Apollo.useMutation<
    PhoneConnectMutation,
    PhoneConnectMutationVariables
  >(PhoneConnectDocument, baseOptions);
}
export type PhoneConnectMutationHookResult = ReturnType<
  typeof usePhoneConnectMutation
>;
export type PhoneConnectMutationResult = Apollo.MutationResult<PhoneConnectMutation>;
export type PhoneConnectMutationOptions = Apollo.BaseMutationOptions<
  PhoneConnectMutation,
  PhoneConnectMutationVariables
>;
export const PhoneRegisterDocument = gql`
  mutation phoneRegister($input: PhoneRegisterInput!) {
    phoneRegister(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type PhoneRegisterMutationFn = Apollo.MutationFunction<
  PhoneRegisterMutation,
  PhoneRegisterMutationVariables
>;

/**
 * __usePhoneRegisterMutation__
 *
 * To run a mutation, you first call `usePhoneRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePhoneRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [phoneRegisterMutation, { data, loading, error }] = usePhoneRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePhoneRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    PhoneRegisterMutation,
    PhoneRegisterMutationVariables
  >
) {
  return Apollo.useMutation<
    PhoneRegisterMutation,
    PhoneRegisterMutationVariables
  >(PhoneRegisterDocument, baseOptions);
}
export type PhoneRegisterMutationHookResult = ReturnType<
  typeof usePhoneRegisterMutation
>;
export type PhoneRegisterMutationResult = Apollo.MutationResult<PhoneRegisterMutation>;
export type PhoneRegisterMutationOptions = Apollo.BaseMutationOptions<
  PhoneRegisterMutation,
  PhoneRegisterMutationVariables
>;
export const UpdateUsernameDocument = gql`
  mutation updateUsername($input: UpdateUsernameInput!) {
    updateUsername(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type UpdateUsernameMutationFn = Apollo.MutationFunction<
  UpdateUsernameMutation,
  UpdateUsernameMutationVariables
>;

/**
 * __useUpdateUsernameMutation__
 *
 * To run a mutation, you first call `useUpdateUsernameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUsernameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUsernameMutation, { data, loading, error }] = useUpdateUsernameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUsernameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUsernameMutation,
    UpdateUsernameMutationVariables
  >
) {
  return Apollo.useMutation<
    UpdateUsernameMutation,
    UpdateUsernameMutationVariables
  >(UpdateUsernameDocument, baseOptions);
}
export type UpdateUsernameMutationHookResult = ReturnType<
  typeof useUpdateUsernameMutation
>;
export type UpdateUsernameMutationResult = Apollo.MutationResult<UpdateUsernameMutation>;
export type UpdateUsernameMutationOptions = Apollo.BaseMutationOptions<
  UpdateUsernameMutation,
  UpdateUsernameMutationVariables
>;
export const MeDocument = gql`
  query me {
    me {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    baseOptions
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const CategoriesDocument = gql`
  query categories {
    categories {
      ...CategoryFields
    }
  }
  ${CategoryFieldsFragmentDoc}
`;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return Apollo.useQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  );
}
export function useCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CategoriesQuery,
    CategoriesQueryVariables
  >
) {
  return Apollo.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(
    CategoriesDocument,
    baseOptions
  );
}
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<
  typeof useCategoriesLazyQuery
>;
export type CategoriesQueryResult = Apollo.QueryResult<
  CategoriesQuery,
  CategoriesQueryVariables
>;
export const EpisodesDocument = gql`
  query episodes($animeId: Float!) {
    episodes(animeId: $animeId) {
      ...EpisodeFields
    }
  }
  ${EpisodeFieldsFragmentDoc}
`;

/**
 * __useEpisodesQuery__
 *
 * To run a query within a React component, call `useEpisodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEpisodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEpisodesQuery({
 *   variables: {
 *      animeId: // value for 'animeId'
 *   },
 * });
 */
export function useEpisodesQuery(
  baseOptions?: Apollo.QueryHookOptions<EpisodesQuery, EpisodesQueryVariables>
) {
  return Apollo.useQuery<EpisodesQuery, EpisodesQueryVariables>(
    EpisodesDocument,
    baseOptions
  );
}
export function useEpisodesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EpisodesQuery,
    EpisodesQueryVariables
  >
) {
  return Apollo.useLazyQuery<EpisodesQuery, EpisodesQueryVariables>(
    EpisodesDocument,
    baseOptions
  );
}
export type EpisodesQueryHookResult = ReturnType<typeof useEpisodesQuery>;
export type EpisodesLazyQueryHookResult = ReturnType<
  typeof useEpisodesLazyQuery
>;
export type EpisodesQueryResult = Apollo.QueryResult<
  EpisodesQuery,
  EpisodesQueryVariables
>;
export const HomeAnimesDocument = gql`
  query homeAnimes {
    action: categoryPreview(id: 4) {
      ...CategoryPreviewFields
    }
    romance: categoryPreview(id: 3) {
      ...CategoryPreviewFields
    }
    comedie: categoryPreview(id: 1) {
      ...CategoryPreviewFields
    }
    drame: categoryPreview(id: 6) {
      ...CategoryPreviewFields
    }
    sf: categoryPreview(id: 10) {
      ...CategoryPreviewFields
    }
    userAnimeViewsByStatus(
      status: IN_PROGRESS
      options: { limit: 10, offset: 0 }
    ) {
      hasMore
      total
      fields {
        ...UserAnimeViewFields
      }
    }
  }
  ${CategoryPreviewFieldsFragmentDoc}
  ${UserAnimeViewFieldsFragmentDoc}
`;

/**
 * __useHomeAnimesQuery__
 *
 * To run a query within a React component, call `useHomeAnimesQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeAnimesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeAnimesQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeAnimesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    HomeAnimesQuery,
    HomeAnimesQueryVariables
  >
) {
  return Apollo.useQuery<HomeAnimesQuery, HomeAnimesQueryVariables>(
    HomeAnimesDocument,
    baseOptions
  );
}
export function useHomeAnimesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeAnimesQuery,
    HomeAnimesQueryVariables
  >
) {
  return Apollo.useLazyQuery<HomeAnimesQuery, HomeAnimesQueryVariables>(
    HomeAnimesDocument,
    baseOptions
  );
}
export type HomeAnimesQueryHookResult = ReturnType<typeof useHomeAnimesQuery>;
export type HomeAnimesLazyQueryHookResult = ReturnType<
  typeof useHomeAnimesLazyQuery
>;
export type HomeAnimesQueryResult = Apollo.QueryResult<
  HomeAnimesQuery,
  HomeAnimesQueryVariables
>;
export const SetUserAnimeViewStatusDocument = gql`
  mutation setUserAnimeViewStatus($status: AnimeViewStatus!, $animeId: Float!) {
    setUserAnimeViewStatus(status: $status, animeId: $animeId) {
      ...UserAnimeViewFields
    }
  }
  ${UserAnimeViewFieldsFragmentDoc}
`;
export type SetUserAnimeViewStatusMutationFn = Apollo.MutationFunction<
  SetUserAnimeViewStatusMutation,
  SetUserAnimeViewStatusMutationVariables
>;

/**
 * __useSetUserAnimeViewStatusMutation__
 *
 * To run a mutation, you first call `useSetUserAnimeViewStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserAnimeViewStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserAnimeViewStatusMutation, { data, loading, error }] = useSetUserAnimeViewStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *      animeId: // value for 'animeId'
 *   },
 * });
 */
export function useSetUserAnimeViewStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetUserAnimeViewStatusMutation,
    SetUserAnimeViewStatusMutationVariables
  >
) {
  return Apollo.useMutation<
    SetUserAnimeViewStatusMutation,
    SetUserAnimeViewStatusMutationVariables
  >(SetUserAnimeViewStatusDocument, baseOptions);
}
export type SetUserAnimeViewStatusMutationHookResult = ReturnType<
  typeof useSetUserAnimeViewStatusMutation
>;
export type SetUserAnimeViewStatusMutationResult = Apollo.MutationResult<SetUserAnimeViewStatusMutation>;
export type SetUserAnimeViewStatusMutationOptions = Apollo.BaseMutationOptions<
  SetUserAnimeViewStatusMutation,
  SetUserAnimeViewStatusMutationVariables
>;
export const UserAnimeViewDocument = gql`
  query userAnimeView($animeId: Float!) {
    userAnimeView(animeId: $animeId) {
      ...UserAnimeViewFields
    }
  }
  ${UserAnimeViewFieldsFragmentDoc}
`;

/**
 * __useUserAnimeViewQuery__
 *
 * To run a query within a React component, call `useUserAnimeViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAnimeViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAnimeViewQuery({
 *   variables: {
 *      animeId: // value for 'animeId'
 *   },
 * });
 */
export function useUserAnimeViewQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserAnimeViewQuery,
    UserAnimeViewQueryVariables
  >
) {
  return Apollo.useQuery<UserAnimeViewQuery, UserAnimeViewQueryVariables>(
    UserAnimeViewDocument,
    baseOptions
  );
}
export function useUserAnimeViewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserAnimeViewQuery,
    UserAnimeViewQueryVariables
  >
) {
  return Apollo.useLazyQuery<UserAnimeViewQuery, UserAnimeViewQueryVariables>(
    UserAnimeViewDocument,
    baseOptions
  );
}
export type UserAnimeViewQueryHookResult = ReturnType<
  typeof useUserAnimeViewQuery
>;
export type UserAnimeViewLazyQueryHookResult = ReturnType<
  typeof useUserAnimeViewLazyQuery
>;
export type UserAnimeViewQueryResult = Apollo.QueryResult<
  UserAnimeViewQuery,
  UserAnimeViewQueryVariables
>;
export const UserAnimeViewsByStatusDocument = gql`
  query userAnimeViewsByStatus(
    $status: AnimeViewStatus!
    $options: PaginationInput
  ) {
    userAnimeViewsByStatus(status: $status, options: $options) {
      hasMore
      total
      fields {
        ...UserAnimeViewFields
      }
    }
  }
  ${UserAnimeViewFieldsFragmentDoc}
`;

/**
 * __useUserAnimeViewsByStatusQuery__
 *
 * To run a query within a React component, call `useUserAnimeViewsByStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAnimeViewsByStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAnimeViewsByStatusQuery({
 *   variables: {
 *      status: // value for 'status'
 *      options: // value for 'options'
 *   },
 * });
 */
export function useUserAnimeViewsByStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserAnimeViewsByStatusQuery,
    UserAnimeViewsByStatusQueryVariables
  >
) {
  return Apollo.useQuery<
    UserAnimeViewsByStatusQuery,
    UserAnimeViewsByStatusQueryVariables
  >(UserAnimeViewsByStatusDocument, baseOptions);
}
export function useUserAnimeViewsByStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserAnimeViewsByStatusQuery,
    UserAnimeViewsByStatusQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    UserAnimeViewsByStatusQuery,
    UserAnimeViewsByStatusQueryVariables
  >(UserAnimeViewsByStatusDocument, baseOptions);
}
export type UserAnimeViewsByStatusQueryHookResult = ReturnType<
  typeof useUserAnimeViewsByStatusQuery
>;
export type UserAnimeViewsByStatusLazyQueryHookResult = ReturnType<
  typeof useUserAnimeViewsByStatusLazyQuery
>;
export type UserAnimeViewsByStatusQueryResult = Apollo.QueryResult<
  UserAnimeViewsByStatusQuery,
  UserAnimeViewsByStatusQueryVariables
>;
export const SetUserAnimeEpisodesStatusDocument = gql`
  mutation setUserAnimeEpisodesStatus(
    $input: SetUserAnimeEpisodesStatusInput!
  ) {
    setUserAnimeEpisodesStatus(input: $input) {
      ...UserEpisodeViewFields
    }
  }
  ${UserEpisodeViewFieldsFragmentDoc}
`;
export type SetUserAnimeEpisodesStatusMutationFn = Apollo.MutationFunction<
  SetUserAnimeEpisodesStatusMutation,
  SetUserAnimeEpisodesStatusMutationVariables
>;

/**
 * __useSetUserAnimeEpisodesStatusMutation__
 *
 * To run a mutation, you first call `useSetUserAnimeEpisodesStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUserAnimeEpisodesStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUserAnimeEpisodesStatusMutation, { data, loading, error }] = useSetUserAnimeEpisodesStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetUserAnimeEpisodesStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SetUserAnimeEpisodesStatusMutation,
    SetUserAnimeEpisodesStatusMutationVariables
  >
) {
  return Apollo.useMutation<
    SetUserAnimeEpisodesStatusMutation,
    SetUserAnimeEpisodesStatusMutationVariables
  >(SetUserAnimeEpisodesStatusDocument, baseOptions);
}
export type SetUserAnimeEpisodesStatusMutationHookResult = ReturnType<
  typeof useSetUserAnimeEpisodesStatusMutation
>;
export type SetUserAnimeEpisodesStatusMutationResult = Apollo.MutationResult<SetUserAnimeEpisodesStatusMutation>;
export type SetUserAnimeEpisodesStatusMutationOptions = Apollo.BaseMutationOptions<
  SetUserAnimeEpisodesStatusMutation,
  SetUserAnimeEpisodesStatusMutationVariables
>;
export const UserAnimeEpisodesStatusDocument = gql`
  query userAnimeEpisodesStatus($animeId: Float!) {
    userAnimeEpisodesStatus(animeId: $animeId) {
      ...EpisodeWithStatusFields
    }
  }
  ${EpisodeWithStatusFieldsFragmentDoc}
`;

/**
 * __useUserAnimeEpisodesStatusQuery__
 *
 * To run a query within a React component, call `useUserAnimeEpisodesStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAnimeEpisodesStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAnimeEpisodesStatusQuery({
 *   variables: {
 *      animeId: // value for 'animeId'
 *   },
 * });
 */
export function useUserAnimeEpisodesStatusQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserAnimeEpisodesStatusQuery,
    UserAnimeEpisodesStatusQueryVariables
  >
) {
  return Apollo.useQuery<
    UserAnimeEpisodesStatusQuery,
    UserAnimeEpisodesStatusQueryVariables
  >(UserAnimeEpisodesStatusDocument, baseOptions);
}
export function useUserAnimeEpisodesStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserAnimeEpisodesStatusQuery,
    UserAnimeEpisodesStatusQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    UserAnimeEpisodesStatusQuery,
    UserAnimeEpisodesStatusQueryVariables
  >(UserAnimeEpisodesStatusDocument, baseOptions);
}
export type UserAnimeEpisodesStatusQueryHookResult = ReturnType<
  typeof useUserAnimeEpisodesStatusQuery
>;
export type UserAnimeEpisodesStatusLazyQueryHookResult = ReturnType<
  typeof useUserAnimeEpisodesStatusLazyQuery
>;
export type UserAnimeEpisodesStatusQueryResult = Apollo.QueryResult<
  UserAnimeEpisodesStatusQuery,
  UserAnimeEpisodesStatusQueryVariables
>;
export type AnimeKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "idMAL"
  | "title"
  | "titleEnglish"
  | "titleJapanese"
  | "bannerImage"
  | "posterImage"
  | "description"
  | "MALRating"
  | "type"
  | "status"
  | "releaseDate"
  | "endDate"
  | "author"
  | "editor"
  | "duration"
  | "isAdult"
  | "categories"
  | "episodes"
  | "episodeCount"
  | "arcs"
  | AnimeKeySpecifier
)[];
export type AnimeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  idMAL?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  titleEnglish?: FieldPolicy<any> | FieldReadFunction<any>;
  titleJapanese?: FieldPolicy<any> | FieldReadFunction<any>;
  bannerImage?: FieldPolicy<any> | FieldReadFunction<any>;
  posterImage?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  MALRating?: FieldPolicy<any> | FieldReadFunction<any>;
  type?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  releaseDate?: FieldPolicy<any> | FieldReadFunction<any>;
  endDate?: FieldPolicy<any> | FieldReadFunction<any>;
  author?: FieldPolicy<any> | FieldReadFunction<any>;
  editor?: FieldPolicy<any> | FieldReadFunction<any>;
  duration?: FieldPolicy<any> | FieldReadFunction<any>;
  isAdult?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  episodes?: FieldPolicy<any> | FieldReadFunction<any>;
  episodeCount?: FieldPolicy<any> | FieldReadFunction<any>;
  arcs?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "name"
  | "coverImage"
  | "animes"
  | CategoryKeySpecifier
)[];
export type CategoryFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  coverImage?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EpisodeKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "title"
  | "number"
  | "arcName"
  | "airedDate"
  | "isFiller"
  | "isRecap"
  | "anime"
  | EpisodeKeySpecifier
)[];
export type EpisodeFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  number?: FieldPolicy<any> | FieldReadFunction<any>;
  arcName?: FieldPolicy<any> | FieldReadFunction<any>;
  airedDate?: FieldPolicy<any> | FieldReadFunction<any>;
  isFiller?: FieldPolicy<any> | FieldReadFunction<any>;
  isRecap?: FieldPolicy<any> | FieldReadFunction<any>;
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "username"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserAnimeViewKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "anime"
  | "user"
  | "episodeViews"
  | "lastEpisodeSeen"
  | "nextEpisodeToSee"
  | UserAnimeViewKeySpecifier
)[];
export type UserAnimeViewFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  episodeViews?: FieldPolicy<any> | FieldReadFunction<any>;
  lastEpisodeSeen?: FieldPolicy<any> | FieldReadFunction<any>;
  nextEpisodeToSee?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserEpisodeViewKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "hasBeenSeen"
  | "episode"
  | "animeView"
  | UserEpisodeViewKeySpecifier
)[];
export type UserEpisodeViewFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  hasBeenSeen?: FieldPolicy<any> | FieldReadFunction<any>;
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  animeView?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryPreviewKeySpecifier = (
  | "id"
  | "name"
  | "animes"
  | CategoryPreviewKeySpecifier
)[];
export type CategoryPreviewFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type AnimesOutputKeySpecifier = (
  | "hasMore"
  | "total"
  | "fields"
  | AnimesOutputKeySpecifier
)[];
export type AnimesOutputFieldPolicy = {
  hasMore?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type ArcKeySpecifier = (
  | "title"
  | "firstEpisodeNumber"
  | "lastEpisodeNumber"
  | ArcKeySpecifier
)[];
export type ArcFieldPolicy = {
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  firstEpisodeNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  lastEpisodeNumber?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type GoogleConnectOutputKeySpecifier = (
  | "user"
  | GoogleConnectOutputKeySpecifier
)[];
export type GoogleConnectOutputFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PhoneConnectOutputKeySpecifier = (
  | "user"
  | PhoneConnectOutputKeySpecifier
)[];
export type PhoneConnectOutputFieldPolicy = {
  user?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserAnimeViewsByStatusOutputKeySpecifier = (
  | "hasMore"
  | "total"
  | "fields"
  | UserAnimeViewsByStatusOutputKeySpecifier
)[];
export type UserAnimeViewsByStatusOutputFieldPolicy = {
  hasMore?: FieldPolicy<any> | FieldReadFunction<any>;
  total?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type EpisodeWithStatusKeySpecifier = (
  | "episode"
  | "view"
  | EpisodeWithStatusKeySpecifier
)[];
export type EpisodeWithStatusFieldPolicy = {
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  view?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "anime"
  | "animes"
  | "searchAnimes"
  | "category"
  | "categories"
  | "categoryPreview"
  | "episode"
  | "episodes"
  | "me"
  | "userAnimeViewsByStatus"
  | "userAnimeView"
  | "userAnimeEpisodesStatus"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
  searchAnimes?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  categoryPreview?: FieldPolicy<any> | FieldReadFunction<any>;
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  episodes?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  userAnimeViewsByStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  userAnimeView?: FieldPolicy<any> | FieldReadFunction<any>;
  userAnimeEpisodesStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "logout"
  | "phoneAskConfirmationCode"
  | "phoneConnect"
  | "phoneRegister"
  | "googleConnect"
  | "googleRegister"
  | "updateUsername"
  | "setUserAnimeViewStatus"
  | "setUserAnimeEpisodesStatus"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  logout?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneAskConfirmationCode?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneConnect?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneRegister?: FieldPolicy<any> | FieldReadFunction<any>;
  googleConnect?: FieldPolicy<any> | FieldReadFunction<any>;
  googleRegister?: FieldPolicy<any> | FieldReadFunction<any>;
  updateUsername?: FieldPolicy<any> | FieldReadFunction<any>;
  setUserAnimeViewStatus?: FieldPolicy<any> | FieldReadFunction<any>;
  setUserAnimeEpisodesStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Anime?: {
    keyFields?:
      | false
      | AnimeKeySpecifier
      | (() => undefined | AnimeKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: AnimeFieldPolicy;
  };
  Category?: {
    keyFields?:
      | false
      | CategoryKeySpecifier
      | (() => undefined | CategoryKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: CategoryFieldPolicy;
  };
  Episode?: {
    keyFields?:
      | false
      | EpisodeKeySpecifier
      | (() => undefined | EpisodeKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: EpisodeFieldPolicy;
  };
  User?: {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserFieldPolicy;
  };
  UserAnimeView?: {
    keyFields?:
      | false
      | UserAnimeViewKeySpecifier
      | (() => undefined | UserAnimeViewKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserAnimeViewFieldPolicy;
  };
  UserEpisodeView?: {
    keyFields?:
      | false
      | UserEpisodeViewKeySpecifier
      | (() => undefined | UserEpisodeViewKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserEpisodeViewFieldPolicy;
  };
  CategoryPreview?: {
    keyFields?:
      | false
      | CategoryPreviewKeySpecifier
      | (() => undefined | CategoryPreviewKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: CategoryPreviewFieldPolicy;
  };
  AnimesOutput?: {
    keyFields?:
      | false
      | AnimesOutputKeySpecifier
      | (() => undefined | AnimesOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: AnimesOutputFieldPolicy;
  };
  Arc?: {
    keyFields?: false | ArcKeySpecifier | (() => undefined | ArcKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: ArcFieldPolicy;
  };
  GoogleConnectOutput?: {
    keyFields?:
      | false
      | GoogleConnectOutputKeySpecifier
      | (() => undefined | GoogleConnectOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: GoogleConnectOutputFieldPolicy;
  };
  PhoneConnectOutput?: {
    keyFields?:
      | false
      | PhoneConnectOutputKeySpecifier
      | (() => undefined | PhoneConnectOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PhoneConnectOutputFieldPolicy;
  };
  UserAnimeViewsByStatusOutput?: {
    keyFields?:
      | false
      | UserAnimeViewsByStatusOutputKeySpecifier
      | (() => undefined | UserAnimeViewsByStatusOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserAnimeViewsByStatusOutputFieldPolicy;
  };
  EpisodeWithStatus?: {
    keyFields?:
      | false
      | EpisodeWithStatusKeySpecifier
      | (() => undefined | EpisodeWithStatusKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: EpisodeWithStatusFieldPolicy;
  };
  Query?: {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: QueryFieldPolicy;
  };
  Mutation?: {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: MutationFieldPolicy;
  };
};
