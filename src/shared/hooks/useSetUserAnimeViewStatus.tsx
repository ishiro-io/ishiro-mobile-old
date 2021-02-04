import { useCallback } from "react";

import {
  AnimeViewStatus,
  UserAnimeViewDocument,
  UserAnimeViewFieldsFragment,
  UserAnimeViewFieldsFragmentDoc,
  UserAnimeViewQuery,
  UserAnimeViewsByStatusDocument,
  UserAnimeViewsByStatusQuery,
  useSetUserAnimeViewStatusMutation
} from "shared/graphql/generated";

const useSetUserAnimeView = () => {
  const [setUserAnimeViewStatusMutation] = useSetUserAnimeViewStatusMutation({
    errorPolicy: "all"
  });

  const setUserAnimeView = async ({ itemToUpdate, newStatus }: Options) => {
    setUserAnimeViewStatusMutation({
      variables: {
        animeId: itemToUpdate.anime.id,
        status: newStatus
      },
      optimisticResponse: {
        __typename: "Mutation",
        setUserAnimeViewStatus: {
          __typename: "UserAnimeView",
          ...itemToUpdate,
          status: newStatus
        }
      },
      update: (cache, { data: mutationData }) => {
        if (!mutationData?.setUserAnimeViewStatus) return;

        const cachedStatusFragment = cache.readFragment<UserAnimeViewFieldsFragment>(
          {
            id: `UserAnimeView:${itemToUpdate.id}`,
            fragment: UserAnimeViewFieldsFragmentDoc
          }
        );

        if (cachedStatusFragment) {
          cache.writeFragment<UserAnimeViewFieldsFragment>({
            id: `UserAnimeView:${itemToUpdate.id}`,
            fragment: UserAnimeViewFieldsFragmentDoc,
            data: { ...cachedStatusFragment, status: newStatus }
          });
        }

        const oldStatusCache = cache.readQuery<UserAnimeViewQuery>({
          query: UserAnimeViewDocument,
          variables: { animeId: itemToUpdate.anime.id }
        });

        if (oldStatusCache?.userAnimeView) {
          cache.writeQuery<UserAnimeViewQuery>({
            query: UserAnimeViewDocument,
            variables: { animeId: itemToUpdate.anime.id },
            data: {
              __typename: "Query",
              userAnimeView: {
                ...oldStatusCache.userAnimeView,
                status: mutationData.setUserAnimeViewStatus.status
              }
            }
          });
        } else {
          cache.writeQuery<UserAnimeViewQuery>({
            query: UserAnimeViewDocument,
            variables: { animeId: itemToUpdate.anime.id },
            data: {
              __typename: "Query",
              userAnimeView: mutationData.setUserAnimeViewStatus
            }
          });
        }

        if (itemToUpdate.status !== AnimeViewStatus.None) {
          const oldStatusListCache = cache.readQuery<UserAnimeViewsByStatusQuery>(
            {
              query: UserAnimeViewsByStatusDocument,
              variables: {
                status: itemToUpdate.status,
                options: { offset: 0, limit: 20 }
              }
            }
          );
          if (oldStatusListCache) {
            // * Remove animeStatus from the old list
            cache.writeQuery<UserAnimeViewsByStatusQuery>({
              query: UserAnimeViewsByStatusDocument,
              variables: {
                status: itemToUpdate.status,
                options: { offset: 0, limit: 20 }
              },
              data: {
                ...oldStatusListCache,
                userAnimeViewsByStatus: {
                  ...oldStatusListCache.userAnimeViewsByStatus,
                  fields: [
                    ...oldStatusListCache.userAnimeViewsByStatus.fields.filter(
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

        if (newStatus !== AnimeViewStatus.None) {
          const newStatusListCache = cache.readQuery<UserAnimeViewsByStatusQuery>(
            {
              query: UserAnimeViewsByStatusDocument,
              variables: {
                status: newStatus,
                options: { offset: 0, limit: 20 }
              }
            }
          );
          if (newStatusListCache) {
            // * Add animeStatus to new list
            cache.writeQuery<UserAnimeViewsByStatusQuery>({
              query: UserAnimeViewsByStatusDocument,
              variables: {
                status: newStatus,
                options: { offset: 0, limit: 20 }
              },
              data: {
                ...newStatusListCache,
                userAnimeViewsByStatus: {
                  ...newStatusListCache.userAnimeViewsByStatus,
                  fields: [
                    mutationData.setUserAnimeViewStatus,
                    ...newStatusListCache.userAnimeViewsByStatus.fields
                  ]
                }
              }
            });
          }
        }
      }
    });
  };

  const setUserAnimeViewCallback = useCallback(setUserAnimeView, [
    setUserAnimeView
  ]);

  return setUserAnimeViewCallback;
};

interface Options {
  itemToUpdate: UserAnimeViewFieldsFragment;
  newStatus: AnimeViewStatus;
}

export default useSetUserAnimeView;
