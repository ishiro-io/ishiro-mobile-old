import {
  AnimeDataFieldsFragment,
  AnimeViewingStatus,
  Arc
} from "shared/graphql/generated";

export type AppRoutes = {
  Content: undefined;
  Authentication: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
  Login: undefined;
  SignUp: undefined;
  ConfirmPhoneNumberCode: { phoneNumber: string };
  ForgotPassword: undefined;
  ConfirmPasswordCode: { phoneNumber: string };
  ChangeForgotPassword: { token: string };
  GoogleSetUsername: { accountId: string };
};

export type ContentRoutes = {
  Main: undefined;
  Profile: undefined;
};

export type MainTabsRoutes = {
  Accueil: undefined;
  Recherche: undefined;
  Listes: undefined;
};

export type HomeRoutes = {
  Home: undefined;
  AnimeInfo: { animeId: number };
  CategoryList: { categoryId: number; categoryName: string };
};

export type SearchRoutes = {
  Search: undefined;
  AnimeInfo: { animeId: number };
  CategoryList: { categoryId: number; categoryName: string };
};

export type SearchTabRoutes = {
  Genres: undefined;
  Tous: undefined;
};

export type StatusListsRoutes = {
  StatusLists: undefined;
  AnimeInfo: { animeId: number };
};

export type StatusListsTabRoutes = {
  ToSee: { status: AnimeViewingStatus };
  InProgress: { status: AnimeViewingStatus };
  Finished: { status: AnimeViewingStatus };
  Abandonned: { status: AnimeViewingStatus };
};

export type AnimeInfoModalRoutes = {
  Main: { animeId: number; animeData: AnimeDataFieldsFragment };
  ArcListModal: {
    arcList: Arc[];
    selectedArcIndex: number | undefined;
    setSelectedArcIndex: React.Dispatch<React.SetStateAction<number>>;
  };
};

export type AnimeInfoTabRoutes = {
  Episodes: { animeId: number; animeData: AnimeDataFieldsFragment };
  Informations: { animeId: number };
};
