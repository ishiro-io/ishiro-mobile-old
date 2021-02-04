import {
  AnimeDataFieldsFragment,
  Arc,
  UserAnimeView
} from "shared/graphql/generated";

export type AppRoutes = {
  Content: undefined;
  Authentication: undefined;
};

export type AuthenticationRoutes = {
  Onboarding: undefined;
  AskConfirmPhoneNumberCode: undefined;
  ConfirmPhoneNumberCode: { phoneNumber: string };
  SetUsername: {
    type: "Google" | "Phone";
    accountId?: string;
    phoneNumber?: string;
    code?: string;
  };
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
  ToSee: { view: UserAnimeView };
  InProgress: { view: UserAnimeView };
  Finished: { view: UserAnimeView };
  Abandonned: { view: UserAnimeView };
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
