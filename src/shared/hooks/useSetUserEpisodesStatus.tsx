import { useCallback } from "react";

import {
  SetUserEpisodesStatusMutationVariables,
  UserAnimeStatusFieldsFragment,
  UserAnimeStatusFieldsFragmentDoc,
  UserEpisodesStatusDocument,
  UserEpisodesStatusQuery,
  useSetUserEpisodesStatusMutation
} from "shared/graphql/generated";

const useSetUserEpisodesStatus = () => {
  const [setUserEpisodesStatusMutation] = useSetUserEpisodesStatusMutation({
    errorPolicy: "all"
  });

  const setUserEpisodesStatus = async ({
    input: { animeId, newEpisodeStatus },
    arcName
  }: Options) => {
    setUserEpisodesStatusMutation({
      variables: {
        input: { animeId, newEpisodeStatus }
      },
      optimisticResponse: {
        __typename: "Mutation",
        setUserEpisodesStatus: newEpisodeStatus.map((episodeStatus) => {
          return {
            __typename: "UserEpisodeStatus",
            id: 0,
            hasBeenSeen: episodeStatus.toSeen,
            episode: {
              __typename: "Episode",
              number: episodeStatus.episodeNumber
            },
            animeStatus: { id: animeId }
          };
        })
      },
      update: (cache, { data: mutationData }) => {
        if (!mutationData?.setUserEpisodesStatus) return;
        const oldStatusListCache = cache.readQuery<UserEpisodesStatusQuery>({
          query: UserEpisodesStatusDocument,
          variables: {
            animeId
          }
        });

        if (oldStatusListCache?.userEpisodesStatus) {
          cache.writeQuery<UserEpisodesStatusQuery>({
            query: UserEpisodesStatusDocument,
            variables: {
              animeId,
              arcName
            },
            data: {
              ...oldStatusListCache,
              // @ts-ignore
              userEpisodesStatus: [
                ...oldStatusListCache.userEpisodesStatus.map((ues) => {
                  const episodeStatus = mutationData.setUserEpisodesStatus?.find(
                    (es) => ues.episode.number === es.episode.number
                  );

                  if (!episodeStatus) return ues;

                  return {
                    ...ues,
                    status: {
                      __typename: "UserEpisodeStatus",
                      animeStatus: {
                        __typename: "UserAnimeStatus",
                        id: animeId
                      },
                      episode: episodeStatus.episode,
                      hasBeenSeen: episodeStatus.hasBeenSeen
                    }
                  };
                })
              ]
            }
          });
        }

        const newStatusListCache = cache.readQuery<UserEpisodesStatusQuery>({
          query: UserEpisodesStatusDocument,
          variables: {
            animeId
          }
        });

        const episodesStatus = [...newStatusListCache!.userEpisodesStatus!];

        const sortedEpisodesStatus = episodesStatus.sort(
          (a, b) => a.episode.number - b.episode.number
        );

        const filteredEpisodesStatus = sortedEpisodesStatus.filter(
          (e) => e.status?.hasBeenSeen
        );

        if (filteredEpisodesStatus.length) {
          const lastEpisodeSeen =
            filteredEpisodesStatus[filteredEpisodesStatus.length - 1].episode;

          const lastEpisodeSeenIndex = sortedEpisodesStatus.findIndex(
            (e) => e.episode.number === lastEpisodeSeen.number
          );

          const nextEpisodeToSee =
            sortedEpisodesStatus[lastEpisodeSeenIndex + 1]?.episode ?? null;

          const userAnimeStatusCache = cache.readFragment<UserAnimeStatusFieldsFragment>(
            {
              fragment: UserAnimeStatusFieldsFragmentDoc,
              id: `UserAnimeStatus:${mutationData.setUserEpisodesStatus[0].animeStatus.id}`
            }
          );

          if (userAnimeStatusCache) {
            cache.writeFragment<UserAnimeStatusFieldsFragment>({
              fragment: UserAnimeStatusFieldsFragmentDoc,
              id: `UserAnimeStatus:${mutationData.setUserEpisodesStatus[0].animeStatus.id}`,
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

  const setUserAnimeViewingStatusCallback = useCallback(setUserEpisodesStatus, [
    setUserEpisodesStatus
  ]);

  return setUserAnimeViewingStatusCallback;
};

interface Options extends SetUserEpisodesStatusMutationVariables {
  arcName: string | null | undefined;
}

export default useSetUserEpisodesStatus;
