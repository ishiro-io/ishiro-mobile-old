import { useCallback } from "react";

import {
  AnimeViewingStatus,
  UserAnimeStatusFieldsFragment,
  UserAnimeStatusFieldsFragmentDoc,
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
    itemToUpdate,
    newStatus
  }: Options) => {
    setUserAnimeViewingStatusMutation({
      variables: {
        animeId: itemToUpdate.anime.id,
        status: newStatus
      },
      optimisticResponse: {
        __typename: "Mutation",
        setUserAnimeViewingStatus: {
          ...itemToUpdate,
          status: newStatus
        }
      },
      update: (cache, { data: mutationData }) => {
        if (!mutationData?.setUserAnimeViewingStatus) return;

        const cachedStatusFragment = cache.readFragment<UserAnimeStatusFieldsFragment>(
          {
            id: `UserAnimeStatus:${itemToUpdate.id}`,
            fragment: UserAnimeStatusFieldsFragmentDoc
          }
        );

        if (cachedStatusFragment) {
          cache.writeFragment<UserAnimeStatusFieldsFragment>({
            id: `UserAnimeStatus:${itemToUpdate.id}`,
            fragment: UserAnimeStatusFieldsFragmentDoc,
            data: { ...cachedStatusFragment, status: newStatus }
          });
        }

        if (itemToUpdate.status !== AnimeViewingStatus.None) {
          const oldStatusListCache = cache.readQuery<UserAnimesByViewingStatusQuery>(
            {
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: itemToUpdate.status,
                options: { offset: 0, limit: 20 }
              }
            }
          );
          if (oldStatusListCache) {
            // * Remove animeStatus from the old list
            cache.writeQuery<UserAnimesByViewingStatusQuery>({
              query: UserAnimesByViewingStatusDocument,
              variables: {
                status: itemToUpdate.status,
                options: { offset: 0, limit: 20 }
              },
              data: {
                ...oldStatusListCache,
                userAnimesByViewingStatus: {
                  ...oldStatusListCache.userAnimesByViewingStatus,
                  fields: [
                    ...oldStatusListCache.userAnimesByViewingStatus.fields.filter(
                      (f) => {
                        return f.anime.id !== itemToUpdate.anime.id;
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
  itemToUpdate: UserAnimeStatusFieldsFragment;
  newStatus: AnimeViewingStatus;
}

export default useSetUserAnimeViewingStatus;
