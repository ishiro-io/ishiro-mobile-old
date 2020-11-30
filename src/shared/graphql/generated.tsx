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
    animes: "animes",
    categories: "categories",
    checkConfirmationCode: "checkConfirmationCode",
    isRegisteredWithGoogle: "isRegisteredWithGoogle",
    me: "me"
  },
  Mutation: {
    changeForgotPassword: "changeForgotPassword",
    confirmPhoneNumber: "confirmPhoneNumber",
    forgotPassword: "forgotPassword",
    login: "login",
    loginWithGoogle: "loginWithGoogle",
    register: "register",
    resendConfirmationSMS: "resendConfirmationSMS"
  },
  Fragment: {
    AnimeFields: "AnimeFields",
    CategoryFields: "CategoryFields",
    UserFields: "UserFields"
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

export type BaseEntity = {
  __typename?: "BaseEntity";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  name: Scalars["String"];
  coverImage: Scalars["String"];
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
  thumbnail?: Maybe<Scalars["String"]>;
  airedDate?: Maybe<Scalars["String"]>;
  anime: Anime;
};

export type User = {
  __typename?: "User";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
  phoneNumber?: Maybe<Scalars["String"]>;
};

export type UserEpisodeStatus = {
  __typename?: "UserEpisodeStatus";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  hasBeenSeen?: Maybe<Scalars["Boolean"]>;
  episode: Episode;
  animeStatus: UserAnimeStatus;
};

export type UserAnimeStatus = {
  __typename?: "UserAnimeStatus";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  status: AnimeViewingStatus;
  anime: Anime;
  user: User;
  episodesStatus: Array<UserEpisodeStatus>;
};

export enum AnimeViewingStatus {
  None = "NONE",
  InProgress = "IN_PROGRESS",
  ToSee = "TO_SEE",
  Finished = "FINISHED",
  Abandoned = "ABANDONED"
}

export type Anime = {
  __typename?: "Anime";
  id: Scalars["Float"];
  createdAt: Scalars["String"];
  updatedAt: Scalars["String"];
  idMAL: Scalars["Float"];
  title: Scalars["String"];
  titleEnglish?: Maybe<Scalars["String"]>;
  titleJapanese?: Maybe<Scalars["String"]>;
  bannerImage: Scalars["String"];
  posterImage: Scalars["String"];
  description: Scalars["String"];
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

export type PaginatedAnimesOutput = {
  __typename?: "PaginatedAnimesOutput";
  hasMore: Scalars["Boolean"];
  fields: Array<Anime>;
};

export type CategoryPreview = {
  __typename?: "CategoryPreview";
  title: Scalars["String"];
  animes?: Maybe<Array<Anime>>;
  categoryId?: Maybe<Scalars["Float"]>;
};

export type PopulateAnimeOutput = {
  __typename?: "PopulateAnimeOutput";
  timeToPopulate: Scalars["String"];
  fields: Array<Anime>;
};

export type PaginatedInput = {
  limit: Scalars["Float"];
  offset: Scalars["Float"];
};

export type CreateAnimeInput = {
  idMAL?: Maybe<Scalars["Float"]>;
  title: Scalars["String"];
  titleEnglish?: Maybe<Scalars["String"]>;
  titleJapanese?: Maybe<Scalars["String"]>;
  bannerImage: Scalars["String"];
  posterImage: Scalars["String"];
  description: Scalars["String"];
  MALRating?: Maybe<Scalars["Float"]>;
  type: AnimeType;
  status: AnimeStatus;
  releaseDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  editor?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["String"]>;
  isAdult?: Maybe<Scalars["Boolean"]>;
  categoriesIds: Array<Scalars["Float"]>;
  episodesIds: Array<Scalars["Float"]>;
};

export type UpdateAnimeInput = {
  idMAL?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
  titleEnglish?: Maybe<Scalars["String"]>;
  titleJapanese?: Maybe<Scalars["String"]>;
  bannerImage?: Maybe<Scalars["String"]>;
  posterImage?: Maybe<Scalars["String"]>;
  description?: Maybe<Scalars["String"]>;
  MALRating?: Maybe<Scalars["Float"]>;
  type?: Maybe<AnimeType>;
  status?: Maybe<AnimeStatus>;
  releaseDate?: Maybe<Scalars["String"]>;
  endDate?: Maybe<Scalars["String"]>;
  author?: Maybe<Scalars["String"]>;
  editor?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["String"]>;
  isAdult?: Maybe<Scalars["Boolean"]>;
};

export type CategoriesInput = {
  categoriesIdsToAdd?: Maybe<Array<Scalars["Float"]>>;
  categoriesIdsToDelete?: Maybe<Array<Scalars["Float"]>>;
};

export type CreateCategoriesInput = {
  name: Scalars["String"];
  coverImage: Scalars["String"];
};

export type UpdateCategoryInput = {
  name?: Maybe<Scalars["String"]>;
  coverImage?: Maybe<Scalars["String"]>;
};

export type CreateEpisodesInput = {
  title?: Maybe<Scalars["String"]>;
  number: Scalars["Float"];
  arcName?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  airedDate?: Maybe<Scalars["String"]>;
};

export type PopulateAnimesInput = {
  animeAmount: Scalars["Float"];
  offset?: Maybe<Scalars["Float"]>;
  doPopulateEpisodes?: Maybe<Scalars["Boolean"]>;
  doTranslateDescription?: Maybe<Scalars["Boolean"]>;
};

export type UpdateEpisodeInput = {
  title?: Maybe<Scalars["String"]>;
  number?: Maybe<Scalars["Float"]>;
  arcName?: Maybe<Scalars["String"]>;
  thumbnail?: Maybe<Scalars["String"]>;
  airedDate?: Maybe<Scalars["String"]>;
};

export type UserGoogleLoginInput = {
  accountId: Scalars["String"];
  username?: Maybe<Scalars["String"]>;
};

export type AskPhoneNumberChangeInput = {
  phoneNumber: Scalars["String"];
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type UserChangeForgotPasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type UserLoginInput = {
  phoneNumberOrUsername: Scalars["String"];
  password: Scalars["String"];
};

export type UserRegisterInput = {
  password: Scalars["String"];
  username: Scalars["String"];
  phoneNumber: Scalars["String"];
};

export type UpdateInternalIdentifiersInput = {
  phoneNumber?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type UpdateUsernameInput = {
  username: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  /** Retourne un anime spécifique basé sur son id interne ou son id MyAnimeList */
  anime?: Maybe<Anime>;
  /** Retourne les animes disponibles en base de données */
  animes: PaginatedAnimesOutput;
  /** Retourne toutes les catégories disponibles en base de données */
  categories: Array<Category>;
  /** Retourne les 10 premiers animes des 5 catégories de la home */
  categoriesPreviews: Array<CategoryPreview>;
  /** Retourne une categorie spécifique basé sur son id interne */
  category?: Maybe<Category>;
  /** Retourne un épisode spécifique basée sur son id interne ou l'id de son anime et son numéro d'épisode */
  episode?: Maybe<Episode>;
  /** Retourne tous les épisodes d'un anime disponibles en base de données */
  episodes: Array<Episode>;
  isRegisteredWithGoogle: Scalars["Boolean"];
  checkConfirmationCode?: Maybe<Scalars["Boolean"]>;
  me?: Maybe<User>;
};

export type QueryAnimeArgs = {
  idMAL?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["Float"]>;
};

export type QueryAnimesArgs = {
  categoryId?: Maybe<Scalars["Float"]>;
  options?: Maybe<PaginatedInput>;
};

export type QueryCategoryArgs = {
  id: Scalars["Float"];
};

export type QueryEpisodeArgs = {
  animeId?: Maybe<Scalars["Float"]>;
  number?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["Float"]>;
};

export type QueryEpisodesArgs = {
  animeId: Scalars["Float"];
};

export type QueryIsRegisteredWithGoogleArgs = {
  accountId: Scalars["String"];
};

export type QueryCheckConfirmationCodeArgs = {
  deleteToken?: Maybe<Scalars["Boolean"]>;
  type: ConfirmationCodeType;
  token: Scalars["String"];
};

export enum ConfirmationCodeType {
  PhoneNumber = "PHONE_NUMBER",
  Password = "PASSWORD"
}

export type Mutation = {
  __typename?: "Mutation";
  /** Créer un anime */
  createAnime?: Maybe<Anime>;
  /** Supprime un anime de la base de données */
  deleteAnime?: Maybe<Scalars["Boolean"]>;
  /** Met à jour certaines données d'un anime */
  updateAnime?: Maybe<Anime>;
  /** Créer des catégories basées sur les données passées en Input */
  createCategories?: Maybe<Array<Category>>;
  /** Supprime une ou des catégories de la base de données */
  deleteCategories: Scalars["Boolean"];
  /** Met à jour certaines données d'une catégorie */
  updateCategory?: Maybe<Category>;
  /** Créer des épisodes basés sur les données passées en Input */
  createEpisodes?: Maybe<Array<Episode>>;
  populateAnimes?: Maybe<PopulateAnimeOutput>;
  populateCategories?: Maybe<Array<Category>>;
  /** Supprime une ou des épisodes de la base de données */
  deleteEpisodes: Scalars["Boolean"];
  /** Met à jour certaines données d'un épisode */
  updateEpisode?: Maybe<Episode>;
  loginWithGoogle: User;
  askPhoneNumberChange: Scalars["Boolean"];
  changeForgotPassword?: Maybe<User>;
  confirmPhoneNumber?: Maybe<User>;
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: Scalars["Boolean"];
  resendConfirmationSMS: Scalars["Boolean"];
  updateInternalIdentifiers?: Maybe<User>;
  updateUsername?: Maybe<User>;
};

export type MutationCreateAnimeArgs = {
  input: CreateAnimeInput;
};

export type MutationDeleteAnimeArgs = {
  id: Scalars["Float"];
};

export type MutationUpdateAnimeArgs = {
  categoriesInput?: Maybe<CategoriesInput>;
  input: UpdateAnimeInput;
  id: Scalars["Float"];
};

export type MutationCreateCategoriesArgs = {
  input: Array<CreateCategoriesInput>;
};

export type MutationDeleteCategoriesArgs = {
  ids: Array<Scalars["Float"]>;
};

export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryInput;
  id: Scalars["Float"];
};

export type MutationCreateEpisodesArgs = {
  animeId?: Maybe<Scalars["Float"]>;
  input: Array<CreateEpisodesInput>;
};

export type MutationPopulateAnimesArgs = {
  input: PopulateAnimesInput;
};

export type MutationDeleteEpisodesArgs = {
  ids: Array<Scalars["Float"]>;
};

export type MutationUpdateEpisodeArgs = {
  input: UpdateEpisodeInput;
  id: Scalars["Float"];
};

export type MutationLoginWithGoogleArgs = {
  input: UserGoogleLoginInput;
};

export type MutationAskPhoneNumberChangeArgs = {
  input: AskPhoneNumberChangeInput;
};

export type MutationChangeForgotPasswordArgs = {
  input: UserChangeForgotPasswordInput;
};

export type MutationConfirmPhoneNumberArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  phoneNumber: Scalars["String"];
};

export type MutationLoginArgs = {
  input: UserLoginInput;
};

export type MutationRegisterArgs = {
  input: UserRegisterInput;
};

export type MutationResendConfirmationSmsArgs = {
  phoneNumber: Scalars["String"];
};

export type MutationUpdateInternalIdentifiersArgs = {
  input: UpdateInternalIdentifiersInput;
};

export type MutationUpdateUsernameArgs = {
  input: UpdateUsernameInput;
};

export type AnimeFieldsFragment = { __typename?: "Anime" } & Pick<
  Anime,
  "id" | "title" | "bannerImage" | "posterImage"
>;

export type AnimesQueryVariables = Exact<{
  categoryId?: Maybe<Scalars["Float"]>;
  options?: Maybe<PaginatedInput>;
}>;

export type AnimesQuery = { __typename?: "Query" } & {
  animes: { __typename?: "PaginatedAnimesOutput" } & Pick<
    PaginatedAnimesOutput,
    "hasMore"
  > & { fields: Array<{ __typename?: "Anime" } & AnimeFieldsFragment> };
};

export type CategoryFieldsFragment = { __typename?: "Category" } & Pick<
  Category,
  "id" | "name" | "coverImage"
>;

export type CategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type CategoriesQuery = { __typename?: "Query" } & {
  categories: Array<{ __typename?: "Category" } & CategoryFieldsFragment>;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "phoneNumber"
>;

export type ChangeForgotPasswordMutationVariables = Exact<{
  input: UserChangeForgotPasswordInput;
}>;

export type ChangeForgotPasswordMutation = { __typename?: "Mutation" } & {
  changeForgotPassword?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type ConfirmPhoneNumberMutationVariables = Exact<{
  token: Scalars["String"];
}>;

export type ConfirmPhoneNumberMutation = { __typename?: "Mutation" } & {
  confirmPhoneNumber?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type ForgotPasswordMutationVariables = Exact<{
  phoneNumber: Scalars["String"];
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "forgotPassword"
>;

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
  login?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export type LoginWithGoogleMutationVariables = Exact<{
  input: UserGoogleLoginInput;
}>;

export type LoginWithGoogleMutation = { __typename?: "Mutation" } & {
  loginWithGoogle: { __typename?: "User" } & UserFieldsFragment;
};

export type RegisterMutationVariables = Exact<{
  input: UserRegisterInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "register"
>;

export type ResendConfirmationSmsMutationVariables = Exact<{
  phoneNumber: Scalars["String"];
}>;

export type ResendConfirmationSmsMutation = { __typename?: "Mutation" } & Pick<
  Mutation,
  "resendConfirmationSMS"
>;

export type CheckConfirmationCodeQueryVariables = Exact<{
  token: Scalars["String"];
  type: ConfirmationCodeType;
  deleteToken?: Maybe<Scalars["Boolean"]>;
}>;

export type CheckConfirmationCodeQuery = { __typename?: "Query" } & Pick<
  Query,
  "checkConfirmationCode"
>;

export type IsRegisteredWithGoogleQueryVariables = Exact<{
  accountId: Scalars["String"];
}>;

export type IsRegisteredWithGoogleQuery = { __typename?: "Query" } & Pick<
  Query,
  "isRegisteredWithGoogle"
>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export const AnimeFieldsFragmentDoc = gql`
  fragment AnimeFields on Anime {
    id
    title
    bannerImage
    posterImage
  }
`;
export const CategoryFieldsFragmentDoc = gql`
  fragment CategoryFields on Category {
    id
    name
    coverImage
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    username
    phoneNumber
  }
`;
export const AnimesDocument = gql`
  query animes($categoryId: Float, $options: PaginatedInput) {
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
export const ChangeForgotPasswordDocument = gql`
  mutation changeForgotPassword($input: UserChangeForgotPasswordInput!) {
    changeForgotPassword(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type ChangeForgotPasswordMutationFn = Apollo.MutationFunction<
  ChangeForgotPasswordMutation,
  ChangeForgotPasswordMutationVariables
>;

/**
 * __useChangeForgotPasswordMutation__
 *
 * To run a mutation, you first call `useChangeForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeForgotPasswordMutation, { data, loading, error }] = useChangeForgotPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ChangeForgotPasswordMutation,
    ChangeForgotPasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ChangeForgotPasswordMutation,
    ChangeForgotPasswordMutationVariables
  >(ChangeForgotPasswordDocument, baseOptions);
}
export type ChangeForgotPasswordMutationHookResult = ReturnType<
  typeof useChangeForgotPasswordMutation
>;
export type ChangeForgotPasswordMutationResult = Apollo.MutationResult<ChangeForgotPasswordMutation>;
export type ChangeForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ChangeForgotPasswordMutation,
  ChangeForgotPasswordMutationVariables
>;
export const ConfirmPhoneNumberDocument = gql`
  mutation confirmPhoneNumber($token: String!) {
    confirmPhoneNumber(token: $token) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type ConfirmPhoneNumberMutationFn = Apollo.MutationFunction<
  ConfirmPhoneNumberMutation,
  ConfirmPhoneNumberMutationVariables
>;

/**
 * __useConfirmPhoneNumberMutation__
 *
 * To run a mutation, you first call `useConfirmPhoneNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmPhoneNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmPhoneNumberMutation, { data, loading, error }] = useConfirmPhoneNumberMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useConfirmPhoneNumberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConfirmPhoneNumberMutation,
    ConfirmPhoneNumberMutationVariables
  >
) {
  return Apollo.useMutation<
    ConfirmPhoneNumberMutation,
    ConfirmPhoneNumberMutationVariables
  >(ConfirmPhoneNumberDocument, baseOptions);
}
export type ConfirmPhoneNumberMutationHookResult = ReturnType<
  typeof useConfirmPhoneNumberMutation
>;
export type ConfirmPhoneNumberMutationResult = Apollo.MutationResult<ConfirmPhoneNumberMutation>;
export type ConfirmPhoneNumberMutationOptions = Apollo.BaseMutationOptions<
  ConfirmPhoneNumberMutation,
  ConfirmPhoneNumberMutationVariables
>;
export const ForgotPasswordDocument = gql`
  mutation forgotPassword($phoneNumber: String!) {
    forgotPassword(phoneNumber: $phoneNumber)
  }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useForgotPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >
) {
  return Apollo.useMutation<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
  >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
  typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
  ForgotPasswordMutation,
  ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
  mutation login($input: UserLoginInput!) {
    login(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LoginWithGoogleDocument = gql`
  mutation loginWithGoogle($input: UserGoogleLoginInput!) {
    loginWithGoogle(input: $input) {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;
export type LoginWithGoogleMutationFn = Apollo.MutationFunction<
  LoginWithGoogleMutation,
  LoginWithGoogleMutationVariables
>;

/**
 * __useLoginWithGoogleMutation__
 *
 * To run a mutation, you first call `useLoginWithGoogleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithGoogleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithGoogleMutation, { data, loading, error }] = useLoginWithGoogleMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginWithGoogleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginWithGoogleMutation,
    LoginWithGoogleMutationVariables
  >
) {
  return Apollo.useMutation<
    LoginWithGoogleMutation,
    LoginWithGoogleMutationVariables
  >(LoginWithGoogleDocument, baseOptions);
}
export type LoginWithGoogleMutationHookResult = ReturnType<
  typeof useLoginWithGoogleMutation
>;
export type LoginWithGoogleMutationResult = Apollo.MutationResult<LoginWithGoogleMutation>;
export type LoginWithGoogleMutationOptions = Apollo.BaseMutationOptions<
  LoginWithGoogleMutation,
  LoginWithGoogleMutationVariables
>;
export const RegisterDocument = gql`
  mutation register($input: UserRegisterInput!) {
    register(input: $input)
  }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    baseOptions
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const ResendConfirmationSmsDocument = gql`
  mutation resendConfirmationSMS($phoneNumber: String!) {
    resendConfirmationSMS(phoneNumber: $phoneNumber)
  }
`;
export type ResendConfirmationSmsMutationFn = Apollo.MutationFunction<
  ResendConfirmationSmsMutation,
  ResendConfirmationSmsMutationVariables
>;

/**
 * __useResendConfirmationSmsMutation__
 *
 * To run a mutation, you first call `useResendConfirmationSmsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResendConfirmationSmsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resendConfirmationSmsMutation, { data, loading, error }] = useResendConfirmationSmsMutation({
 *   variables: {
 *      phoneNumber: // value for 'phoneNumber'
 *   },
 * });
 */
export function useResendConfirmationSmsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ResendConfirmationSmsMutation,
    ResendConfirmationSmsMutationVariables
  >
) {
  return Apollo.useMutation<
    ResendConfirmationSmsMutation,
    ResendConfirmationSmsMutationVariables
  >(ResendConfirmationSmsDocument, baseOptions);
}
export type ResendConfirmationSmsMutationHookResult = ReturnType<
  typeof useResendConfirmationSmsMutation
>;
export type ResendConfirmationSmsMutationResult = Apollo.MutationResult<ResendConfirmationSmsMutation>;
export type ResendConfirmationSmsMutationOptions = Apollo.BaseMutationOptions<
  ResendConfirmationSmsMutation,
  ResendConfirmationSmsMutationVariables
>;
export const CheckConfirmationCodeDocument = gql`
  query checkConfirmationCode(
    $token: String!
    $type: ConfirmationCodeType!
    $deleteToken: Boolean
  ) {
    checkConfirmationCode(token: $token, type: $type, deleteToken: $deleteToken)
  }
`;

/**
 * __useCheckConfirmationCodeQuery__
 *
 * To run a query within a React component, call `useCheckConfirmationCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckConfirmationCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckConfirmationCodeQuery({
 *   variables: {
 *      token: // value for 'token'
 *      type: // value for 'type'
 *      deleteToken: // value for 'deleteToken'
 *   },
 * });
 */
export function useCheckConfirmationCodeQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CheckConfirmationCodeQuery,
    CheckConfirmationCodeQueryVariables
  >
) {
  return Apollo.useQuery<
    CheckConfirmationCodeQuery,
    CheckConfirmationCodeQueryVariables
  >(CheckConfirmationCodeDocument, baseOptions);
}
export function useCheckConfirmationCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckConfirmationCodeQuery,
    CheckConfirmationCodeQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    CheckConfirmationCodeQuery,
    CheckConfirmationCodeQueryVariables
  >(CheckConfirmationCodeDocument, baseOptions);
}
export type CheckConfirmationCodeQueryHookResult = ReturnType<
  typeof useCheckConfirmationCodeQuery
>;
export type CheckConfirmationCodeLazyQueryHookResult = ReturnType<
  typeof useCheckConfirmationCodeLazyQuery
>;
export type CheckConfirmationCodeQueryResult = Apollo.QueryResult<
  CheckConfirmationCodeQuery,
  CheckConfirmationCodeQueryVariables
>;
export const IsRegisteredWithGoogleDocument = gql`
  query isRegisteredWithGoogle($accountId: String!) {
    isRegisteredWithGoogle(accountId: $accountId)
  }
`;

/**
 * __useIsRegisteredWithGoogleQuery__
 *
 * To run a query within a React component, call `useIsRegisteredWithGoogleQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsRegisteredWithGoogleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsRegisteredWithGoogleQuery({
 *   variables: {
 *      accountId: // value for 'accountId'
 *   },
 * });
 */
export function useIsRegisteredWithGoogleQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IsRegisteredWithGoogleQuery,
    IsRegisteredWithGoogleQueryVariables
  >
) {
  return Apollo.useQuery<
    IsRegisteredWithGoogleQuery,
    IsRegisteredWithGoogleQueryVariables
  >(IsRegisteredWithGoogleDocument, baseOptions);
}
export function useIsRegisteredWithGoogleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsRegisteredWithGoogleQuery,
    IsRegisteredWithGoogleQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    IsRegisteredWithGoogleQuery,
    IsRegisteredWithGoogleQueryVariables
  >(IsRegisteredWithGoogleDocument, baseOptions);
}
export type IsRegisteredWithGoogleQueryHookResult = ReturnType<
  typeof useIsRegisteredWithGoogleQuery
>;
export type IsRegisteredWithGoogleLazyQueryHookResult = ReturnType<
  typeof useIsRegisteredWithGoogleLazyQuery
>;
export type IsRegisteredWithGoogleQueryResult = Apollo.QueryResult<
  IsRegisteredWithGoogleQuery,
  IsRegisteredWithGoogleQueryVariables
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
export type BaseEntityKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | BaseEntityKeySpecifier
)[];
export type BaseEntityFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "thumbnail"
  | "airedDate"
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
  thumbnail?: FieldPolicy<any> | FieldReadFunction<any>;
  airedDate?: FieldPolicy<any> | FieldReadFunction<any>;
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "username"
  | "phoneNumber"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
  phoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserEpisodeStatusKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "hasBeenSeen"
  | "episode"
  | "animeStatus"
  | UserEpisodeStatusKeySpecifier
)[];
export type UserEpisodeStatusFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  hasBeenSeen?: FieldPolicy<any> | FieldReadFunction<any>;
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  animeStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserAnimeStatusKeySpecifier = (
  | "id"
  | "createdAt"
  | "updatedAt"
  | "status"
  | "anime"
  | "user"
  | "episodesStatus"
  | UserAnimeStatusKeySpecifier
)[];
export type UserAnimeStatusFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  status?: FieldPolicy<any> | FieldReadFunction<any>;
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  episodesStatus?: FieldPolicy<any> | FieldReadFunction<any>;
};
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
};
export type PaginatedAnimesOutputKeySpecifier = (
  | "hasMore"
  | "fields"
  | PaginatedAnimesOutputKeySpecifier
)[];
export type PaginatedAnimesOutputFieldPolicy = {
  hasMore?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type CategoryPreviewKeySpecifier = (
  | "title"
  | "animes"
  | "categoryId"
  | CategoryPreviewKeySpecifier
)[];
export type CategoryPreviewFieldPolicy = {
  title?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
  categoryId?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type PopulateAnimeOutputKeySpecifier = (
  | "timeToPopulate"
  | "fields"
  | PopulateAnimeOutputKeySpecifier
)[];
export type PopulateAnimeOutputFieldPolicy = {
  timeToPopulate?: FieldPolicy<any> | FieldReadFunction<any>;
  fields?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | "anime"
  | "animes"
  | "categories"
  | "categoriesPreviews"
  | "category"
  | "episode"
  | "episodes"
  | "isRegisteredWithGoogle"
  | "checkConfirmationCode"
  | "me"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  categoriesPreviews?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  episodes?: FieldPolicy<any> | FieldReadFunction<any>;
  isRegisteredWithGoogle?: FieldPolicy<any> | FieldReadFunction<any>;
  checkConfirmationCode?: FieldPolicy<any> | FieldReadFunction<any>;
  me?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | "createAnime"
  | "deleteAnime"
  | "updateAnime"
  | "createCategories"
  | "deleteCategories"
  | "updateCategory"
  | "createEpisodes"
  | "populateAnimes"
  | "populateCategories"
  | "deleteEpisodes"
  | "updateEpisode"
  | "loginWithGoogle"
  | "askPhoneNumberChange"
  | "changeForgotPassword"
  | "confirmPhoneNumber"
  | "forgotPassword"
  | "login"
  | "logout"
  | "register"
  | "resendConfirmationSMS"
  | "updateInternalIdentifiers"
  | "updateUsername"
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  createAnime?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteAnime?: FieldPolicy<any> | FieldReadFunction<any>;
  updateAnime?: FieldPolicy<any> | FieldReadFunction<any>;
  createCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  updateCategory?: FieldPolicy<any> | FieldReadFunction<any>;
  createEpisodes?: FieldPolicy<any> | FieldReadFunction<any>;
  populateAnimes?: FieldPolicy<any> | FieldReadFunction<any>;
  populateCategories?: FieldPolicy<any> | FieldReadFunction<any>;
  deleteEpisodes?: FieldPolicy<any> | FieldReadFunction<any>;
  updateEpisode?: FieldPolicy<any> | FieldReadFunction<any>;
  loginWithGoogle?: FieldPolicy<any> | FieldReadFunction<any>;
  askPhoneNumberChange?: FieldPolicy<any> | FieldReadFunction<any>;
  changeForgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  confirmPhoneNumber?: FieldPolicy<any> | FieldReadFunction<any>;
  forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  logout?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
  resendConfirmationSMS?: FieldPolicy<any> | FieldReadFunction<any>;
  updateInternalIdentifiers?: FieldPolicy<any> | FieldReadFunction<any>;
  updateUsername?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  BaseEntity?: {
    keyFields?:
      | false
      | BaseEntityKeySpecifier
      | (() => undefined | BaseEntityKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: BaseEntityFieldPolicy;
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
  UserEpisodeStatus?: {
    keyFields?:
      | false
      | UserEpisodeStatusKeySpecifier
      | (() => undefined | UserEpisodeStatusKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserEpisodeStatusFieldPolicy;
  };
  UserAnimeStatus?: {
    keyFields?:
      | false
      | UserAnimeStatusKeySpecifier
      | (() => undefined | UserAnimeStatusKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: UserAnimeStatusFieldPolicy;
  };
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
  PaginatedAnimesOutput?: {
    keyFields?:
      | false
      | PaginatedAnimesOutputKeySpecifier
      | (() => undefined | PaginatedAnimesOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PaginatedAnimesOutputFieldPolicy;
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
  PopulateAnimeOutput?: {
    keyFields?:
      | false
      | PopulateAnimeOutputKeySpecifier
      | (() => undefined | PopulateAnimeOutputKeySpecifier);
    queryType?: true;
    mutationType?: true;
    subscriptionType?: true;
    fields?: PopulateAnimeOutputFieldPolicy;
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
