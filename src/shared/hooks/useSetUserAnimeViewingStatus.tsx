import { useCallback } from "react";

import {
  AnimeViewingStatus,
  UserAnimeViewingStatusDocument,
  UserAnimeViewingStatusQuery,
  UserAnimesByViewingStatusDocument,
  UserAnimesByViewingStatusQuery,
  useSetUserAnimeViewingStatusMutation
} from "shared/graphql/generated";

const useSetUserAnimeViewingStatus = () => {
  const [
    setUserAnimeViewingStatusMutation
  ] = useSetUserAnimeViewingStatusMutation({
    errorPolicy: "all"
  });

  const setUserAnimeViewingStatus = async ({
    animeId,
    oldStatus,
    newStatus,
    posterImage = "",
    title = ""
  }: Options) => {
    setUserAnimeViewingStatusMutation({
      variables: {
        animeId,
        status: newStatus
      },
      optimisticResponse: {
        __typename: "Mutation",
        setUserAnimeViewingStatus: {
          id: 0,
          status: newStatus,
          __typename: "UserAnimeStatus",
          anime: {
            __typename: "Anime",
            id: animeId,
            posterImage,
            title
          },
          episodesStatus: [],
          lastEpisodeSeen: null,
          nextEpisodeToSee: null
        }
      },
      update: (cache, { data: mutationData }) => {
        if (!mutationData?.setUserAnimeViewingStatus) return;

        const oldStatusCache = cache.readQuery<UserAnimeViewingStatusQuery>({
          query: UserAnimeViewingStatusDocument,
          variables: { animeId }
        });

        if (oldStatusCache?.userAnimeViewingStatus) {
          cache.writeQuery<UserAnimeViewingStatusQuery>({
            query: UserAnimeViewingStatusDocument,
            variables: { animeId },
            data: {
              __typename: "Query",
              userAnimeViewingStatus: {
                ...oldStatusCache.userAnimeViewingStatus,
                status: mutationData.setUserAnimeViewingStatus.status
              }
            }
          });
        } else {
          cache.writeQuery<UserAnimeViewingStatusQuery>({
            query: UserAnimeViewingStatusDocument,
            variables: { animeId },
            data: {
              __typename: "Query",
              userAnimeViewingStatus: mutationData.setUserAnimeViewingStatus
            }
          });
        }

        if (oldStatus !== AnimeViewingStatus.None) {
          const oldStatusListCache = cache.readQuery<UserAnimesByViewingStatusQuery>(
            {
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: oldStatus,
                options: { offset: 0, limit: 20 }
              }
            }
          );
          if (oldStatusListCache) {
            // * Remove animeStatus from the old list
            cache.writeQuery<UserAnimesByViewingStatusQuery>({
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: oldStatus,
                options: { offset: 0, limit: 20 }
              },
              data: {
                ...oldStatusListCache,
                userAnimesByViewingStatus: {
                  ...oldStatusListCache.userAnimesByViewingStatus,
                  fields: [
                    ...oldStatusListCache.userAnimesByViewingStatus.fields.filter(
                      (f) => {
                        return f.anime.id !== animeId;
                      }
                    )
                  ]
                }
              }
            });
          }
        }

        if (newStatus !== AnimeViewingStatus.None) {
          const newStatusListCache = cache.readQuery<UserAnimesByViewingStatusQuery>(
            {
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: newStatus,
                options: { offset: 0, limit: 20 }
              }
            }
          );
          if (newStatusListCache) {
            // * Add animeStatus to new list
            cache.writeQuery<UserAnimesByViewingStatusQuery>({
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: newStatus,
                options: { offset: 0, limit: 20 }
              },
              data: {
                ...newStatusListCache,
                userAnimesByViewingStatus: {
                  ...newStatusListCache.userAnimesByViewingStatus,
                  fields: [
                    mutationData.setUserAnimeViewingStatus,
                    ...newStatusListCache.userAnimesByViewingStatus.fields
                  ]
                }
              }
            });
          }
        }
      }
    });
  };

  const setUserAnimeViewingStatusCallback = useCallback(
    setUserAnimeViewingStatus,
    [setUserAnimeViewingStatus]
  );

  return setUserAnimeViewingStatusCallback;
};

interface Options {
  animeId: number;
  oldStatus: AnimeViewingStatus;
  newStatus: AnimeViewingStatus;
  posterImage?: string;
  title?: string;
}

export default useSetUserAnimeViewingStatus;
