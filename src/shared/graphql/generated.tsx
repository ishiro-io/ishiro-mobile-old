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
    me: "me"
  },
  Fragment: {
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
  email: Scalars["String"];
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

export type PopulateAnimeOutput = {
  __typename?: "PopulateAnimeOutput";
  timeToPopulate: Scalars["String"];
  fields: Array<Anime>;
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

export type AskEmailChangeInput = {
  email: Scalars["String"];
};

export type PasswordInput = {
  password: Scalars["String"];
};

export type UserChangeForgotPasswordInput = {
  password: Scalars["String"];
  token: Scalars["String"];
};

export type UserLoginInput = {
  emailOrUsername: Scalars["String"];
  password: Scalars["String"];
};

export type UserRegisterInput = {
  password: Scalars["String"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type UpdateUserInformationsInput = {
  username?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  password?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  /** Retourne un anime spécifique basé sur son id interne ou son id MyAnimeList */
  anime?: Maybe<Anime>;
  /** Retourne tout les animes disponibles en base de données */
  animes: Array<Anime>;
  /** Retourne toutes les catégories disponibles en base de données */
  categories: Array<Category>;
  /** Retourne une categorie spécifique basé sur son id interne */
  category?: Maybe<Category>;
  /** Retourne un épisode spécifique basée sur son id interne ou l'id de son anime et son numéro d'épisode */
  episode?: Maybe<Episode>;
  /** Retourne tous les épisodes d'un anime disponibles en base de données */
  episodes: Array<Episode>;
  checkConfirmationCode?: Maybe<Scalars["Boolean"]>;
  me?: Maybe<User>;
};

export type QueryAnimeArgs = {
  idMAL?: Maybe<Scalars["Float"]>;
  id?: Maybe<Scalars["Float"]>;
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

export type QueryCheckConfirmationCodeArgs = {
  deleteToken?: Maybe<Scalars["Boolean"]>;
  type: ConfirmationCodeType;
  token: Scalars["String"];
};

export enum ConfirmationCodeType {
  Email = "EMAIL",
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
  askEmailChange: Scalars["Boolean"];
  changeForgotPassword?: Maybe<User>;
  confirmEmail?: Maybe<User>;
  forgotPassword: Scalars["Boolean"];
  login?: Maybe<User>;
  logout: Scalars["Boolean"];
  register: Scalars["Boolean"];
  resendConfirmationMail: Scalars["Boolean"];
  updateUserInformations?: Maybe<User>;
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

export type MutationAskEmailChangeArgs = {
  input: AskEmailChangeInput;
};

export type MutationChangeForgotPasswordArgs = {
  input: UserChangeForgotPasswordInput;
};

export type MutationConfirmEmailArgs = {
  token: Scalars["String"];
};

export type MutationForgotPasswordArgs = {
  email: Scalars["String"];
};

export type MutationLoginArgs = {
  input: UserLoginInput;
};

export type MutationRegisterArgs = {
  input: UserRegisterInput;
};

export type MutationResendConfirmationMailArgs = {
  email: Scalars["String"];
};

export type MutationUpdateUserInformationsArgs = {
  input: UpdateUserInformationsInput;
};

export type UserFieldsFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "username" | "email"
>;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
  me?: Maybe<{ __typename?: "User" } & UserFieldsFragment>;
};

export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    username
    email
  }
`;
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
  | "email"
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  createdAt?: FieldPolicy<any> | FieldReadFunction<any>;
  updatedAt?: FieldPolicy<any> | FieldReadFunction<any>;
  username?: FieldPolicy<any> | FieldReadFunction<any>;
  email?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "category"
  | "episode"
  | "episodes"
  | "checkConfirmationCode"
  | "me"
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  anime?: FieldPolicy<any> | FieldReadFunction<any>;
  animes?: FieldPolicy<any> | FieldReadFunction<any>;
  categories?: FieldPolicy<any> | FieldReadFunction<any>;
  category?: FieldPolicy<any> | FieldReadFunction<any>;
  episode?: FieldPolicy<any> | FieldReadFunction<any>;
  episodes?: FieldPolicy<any> | FieldReadFunction<any>;
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
  | "askEmailChange"
  | "changeForgotPassword"
  | "confirmEmail"
  | "forgotPassword"
  | "login"
  | "logout"
  | "register"
  | "resendConfirmationMail"
  | "updateUserInformations"
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
  askEmailChange?: FieldPolicy<any> | FieldReadFunction<any>;
  changeForgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  confirmEmail?: FieldPolicy<any> | FieldReadFunction<any>;
  forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>;
  login?: FieldPolicy<any> | FieldReadFunction<any>;
  logout?: FieldPolicy<any> | FieldReadFunction<any>;
  register?: FieldPolicy<any> | FieldReadFunction<any>;
  resendConfirmationMail?: FieldPolicy<any> | FieldReadFunction<any>;
  updateUserInformations?: FieldPolicy<any> | FieldReadFunction<any>;
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
