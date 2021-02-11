import { useCallback } from "react";

import {
  EpisodeWithStatusFieldsFragment,
  SetUserAnimeEpisodesStatusMutationVariables,
  UserAnimeEpisodesStatusDocument,
  UserAnimeEpisodesStatusQuery,
  UserAnimeViewFieldsFragment,
  UserAnimeViewFieldsFragmentDoc,
  useSetUserAnimeEpisodesStatusMutation
} from "shared/graphql/generated";

const useSetUserAnimeEpisodesStatus = () => {
  const [
    setUserAnimeEpisodesStatusMutation
  ] = useSetUserAnimeEpisodesStatusMutation({
    errorPolicy: "all"
  });

  const setUserAnimeEpisodesStatus = async ({
    input: { animeId, newEpisodeViews },
    animeViewId: animeStatusId
  }: Options) => {
    setUserAnimeEpisodesStatusMutation({
      variables: {
        input: { animeId, newEpisodeViews }
      },
      optimisticResponse: {
        __typename: "Mutation",
        setUserAnimeEpisodesStatus: newEpisodeViews.map((episodeView) => {
          return {
            __typename: "UserEpisodeView",
            id: 0,
            hasBeenSeen: episodeView.toSeen,
            episode: {
              __typename: "Episode",
              number: episodeView.episodeNumber
            },
            animeView: { id: animeStatusId }
          };
        })
      },
      update: (cache, { data: mutationData }) => {
        if (!mutationData?.setUserAnimeEpisodesStatus) return;

        // * Get the cached episode views list
        const oldStatusListCache = cache.readQuery<UserAnimeEpisodesStatusQuery>(
          {
            query: UserAnimeEpisodesStatusDocument,
            variables: {
              animeId
            }
          }
        );

        // * Edit the cached episode views list
        if (oldStatusListCache?.userAnimeEpisodesStatus) {
          cache.writeQuery<UserAnimeEpisodesStatusQuery>({
            query: UserAnimeEpisodesStatusDocument,
            variables: {
              animeId
            },
            data: {
              ...oldStatusListCache,
              userAnimeEpisodesStatus: [
                ...oldStatusListCache.userAnimeEpisodesStatus.map<EpisodeWithStatusFieldsFragment>(
                  (cacheStatus) => {
                    const episodeStatus = mutationData.setUserAnimeEpisodesStatus?.find(
                      (mutationStatus) =>
                        cacheStatus.episode.number ===
                        mutationStatus.episode.number
                    );

                    if (!episodeStatus) return cacheStatus;

                    return {
                      ...cacheStatus,
                      view: {
                        __typename: "UserEpisodeView",
                        animeView: {
                          __typename: "UserAnimeView",
                          id: animeId
                        },
                        episode: episodeStatus.episode,
                        hasBeenSeen: episodeStatus.hasBeenSeen
                      }
                    };
                  }
                )
              ]
            }
          });
        }

        // * Get the new cached list
        const newStatusListCache = cache.readQuery<UserAnimeEpisodesStatusQuery>(
          {
            query: UserAnimeEpisodesStatusDocument,
            variables: {
              animeId
            }
          }
        );

        const episodesStatus = [
          ...newStatusListCache!.userAnimeEpisodesStatus!
        ];

        const sortedEpisodesStatus = episodesStatus.sort(
          (a, b) => a.episode.number - b.episode.number
        );

        const filteredEpisodesStatus = sortedEpisodesStatus.filter(
          (e) => e.view?.hasBeenSeen
        );

        if (filteredEpisodesStatus.length) {
          const lastEpisodeSeen =
            filteredEpisodesStatus[filteredEpisodesStatus.length - 1].episode;

          const lastEpisodeSeenIndex = sortedEpisodesStatus.findIndex(
            (e) => e.episode.number === lastEpisodeSeen.number
          );

          const nextEpisodeToSee =
            sortedEpisodesStatus[lastEpisodeSeenIndex + 1]?.episode ?? null;

          const userAnimeStatusCache = cache.readFragment<UserAnimeViewFieldsFragment>(
            {
              fragment: UserAnimeViewFieldsFragmentDoc,
              id: `UserAnimeView:${mutationData.setUserAnimeEpisodesStatus[0].animeView.id}`
            }
          );

          if (userAnimeStatusCache) {
            cache.writeFragment<UserAnimeViewFieldsFragment>({
              fragment: UserAnimeViewFieldsFragmentDoc,
              id: `UserAnimeView:${mutationData.setUserAnimeEpisodesStatus[0].animeView.id}`,
              data: {
                ...userAnimeStatusCache,
                lastEpisodeSeen,
                nextEpisodeToSee
              }
            });
          }
        }
      }
    });
  };

  const setUserAnimeEpisodesStatusCallback = useCallback(
    setUserAnimeEpisodesStatus,
    [setUserAnimeEpisodesStatus]
  );

  return setUserAnimeEpisodesStatusCallback;
};

interface Options extends SetUserAnimeEpisodesStatusMutationVariables {
  animeViewId: number;
}

export default useSetUserAnimeEpisodesStatus;
