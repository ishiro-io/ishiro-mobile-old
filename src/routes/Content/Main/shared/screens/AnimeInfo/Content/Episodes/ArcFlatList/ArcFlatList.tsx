import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  View
} from "react-native";
import { ThemeContext } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";
import { moderateVerticalScale } from "react-native-size-matters";

import { ListEmpty } from "components";
import {
  AnimeDataFieldsFragment,
  AnimeViewStatus,
  EpisodeWithStatusFieldsFragment,
  NewEpisodeView,
  useUserAnimeEpisodesStatusQuery,
  useUserAnimeViewQuery
} from "shared/graphql/generated";
import {
  useSetUserAnimeEpisodesStatus,
  useSetUserAnimeViewStatus,
  useUpdateEffect
} from "shared/hooks";
import { AnimeInfoTabNavigationProps } from "shared/navigation/NavigationProps";

import { ArcFooter } from "./ArcFooter";
import { ArcHeader } from "./ArcHeader";
import { EpisodeRow } from "./EpisodeRow";

const ArcFlatList: React.FC<ArcFlatListProps> = ({
  animeData,
  arcName,
  isLastArc,
  displayHeaderArrow = false,
  onHeaderArrowPress,
  onNextEpisodePressed
}: ArcFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const isFocused = useIsFocused();

  const route = useRoute<AnimeInfoTabNavigationProps<"Episodes">["route"]>();

  const ref = useRef<FlatList<any> | null>(null);

  const { data: animeViewData } = useUserAnimeViewQuery({
    variables: { animeId: route.params.animeId }
  });

  const { data, loading } = useUserAnimeEpisodesStatusQuery({
    variables: {
      animeId: route.params.animeId
    }
  });

  const setUserAnimeEpisodesStatus = useSetUserAnimeEpisodesStatus();
  const setUserAnimeViewingStatus = useSetUserAnimeViewStatus();

  const [appState, setAppState] = useState(AppState.currentState);
  const [hasChanged, setHasChanged] = useState(false);

  const [arcEpisodeList, setArcEpisodeList] = useState<
    EpisodeWithStatusFieldsFragment[]
  >([]);
  const [isListPopulated, setIsListPopulated] = useState(false);

  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  const [areAllCheckedInList, setAreAllCheckedInList] = useState(false);

  const [maxCount, setMaxCount] = useState(0);
  const [checkedCount, setCheckedCount] = useState(0);

  // ? Add app state listener on render
  useEffect(() => {
    const appStateListener = (nextAppState: AppStateStatus) => {
      setAppState(nextAppState);
    };

    AppState.addEventListener("change", appStateListener);

    return () => {
      AppState.removeEventListener("change", appStateListener);
    };
  }, []);

  // ? Initialize arcEpisodeList when data is initialized & when arcName is updated
  useEffect(() => {
    if (!loading) {
      const newArcEpisodeList = (data?.userAnimeEpisodesStatus ?? []).filter(
        (ues) => {
          return (
            (!ues.episode.arcName && arcName === null) ||
            ues.episode.arcName === arcName
          );
        }
      );

      setArcEpisodeList(newArcEpisodeList);
    }
  }, [data, arcName, loading]);

  // ? Initialize isCheckedList, maxCount & checkCount when arcEpisodeList is updated
  useUpdateEffect(() => {
    if (arcEpisodeList) {
      setIsListPopulated(true);
      setIsCheckedList([]);
      setMaxCount(arcEpisodeList.length);
      setCheckedCount(0);
      setHasChanged(false);

      const newIsCheckledList = arcEpisodeList.map(
        (ues) => ues.view?.hasBeenSeen || false
      );

      setIsCheckedList(newIsCheckledList);
    }
  }, [arcEpisodeList]);

  // ? Call mutation and consolidate list when we loose focus
  useUpdateEffect(() => {
    if (
      arcEpisodeList &&
      data?.userAnimeEpisodesStatus &&
      (!isFocused || appState.match(/inactive|background/)) &&
      hasChanged
    ) {
      setIsListPopulated(false);

      const newCheckedEpisode: NewEpisodeView[] = isCheckedList.map(
        (isChecked, index) => {
          const ues = arcEpisodeList[index];
          return { episodeNumber: ues.episode.number, toSeen: isChecked };
        }
      );

      const firstSeenEpisode = newCheckedEpisode.find(
        (nes) => nes.toSeen === true
      );

      let newEpisodeViews = [...newCheckedEpisode];

      if (firstSeenEpisode) {
        const previousEpisodes = data?.userAnimeEpisodesStatus.filter(
          (ues) => ues.episode.number < firstSeenEpisode.episodeNumber
        );

        const previousEpisodeViews = previousEpisodes.map<NewEpisodeView>(
          (episodeStatus) => {
            return {
              episodeNumber: episodeStatus.episode.number,
              toSeen: true
            };
          }
        );

        newEpisodeViews = [...newCheckedEpisode, ...previousEpisodeViews];
      }

      setUserAnimeEpisodesStatus({
        animeViewId: animeViewData?.userAnimeView?.id ?? 0,
        input: {
          animeId: route.params.animeId,
          newEpisodeViews
        }
      });

      setHasChanged(false);
    }
  }, [isFocused, appState]);

  // ? Calculate checkedCount & areAllChecked, when isCheckedList change
  useUpdateEffect(() => {
    const count = isCheckedList.reduce((accumulator, value) => {
      if (value) return accumulator + 1;
      return accumulator;
    }, 0);

    if (count >= maxCount) setAreAllCheckedInList(true);
    else setAreAllCheckedInList(false);

    setCheckedCount(count);

    if (count > 0) checkAndUpdateAnimeStatus(count);
  }, [isCheckedList]);

  // ? Call when check is pressed in EpisodeRow
  // ? when the icon wasn't check, check every icon before it
  // ? when it was already checked, just uncheck this icon
  const onCheckPress = (index: number, toSeen: boolean) => {
    if (data?.userAnimeEpisodesStatus) {
      const newIsCheckedList = isCheckedList.map((check, i) => {
        if (toSeen && i === index) return !toSeen;
        else if (!toSeen && i <= index) return !toSeen;
        else return check;
      });

      setIsCheckedList(newIsCheckedList);

      setHasChanged(true);
    }
  };

  // ? Check or uncheck all icons
  const onMultiCheckPress = (toSeen: boolean) => {
    const newIsCheckedList = isCheckedList.map((_) => toSeen);
    setIsCheckedList(newIsCheckedList);

    setHasChanged(true);
  };

  // ? Change anime status to IN_PROGRESS if his status is at NONE or TO_SEE
  const checkAndUpdateAnimeStatus = (count: number) => {
    const status = animeViewData?.userAnimeView?.status || AnimeViewStatus.None;

    if (count >= maxCount && isLastArc) {
      setUserAnimeViewingStatus({
        itemToUpdate: animeViewData?.userAnimeView ?? {
          id: 0,
          anime: animeData,
          status: AnimeViewStatus.None,
          episodeViews: [],
          lastEpisodeSeen: null,
          nextEpisodeToSee: null
        },
        newStatus: AnimeViewStatus.Finished
      });
    } else {
      if (status === AnimeViewStatus.None || status === AnimeViewStatus.ToSee)
        setUserAnimeViewingStatus({
          itemToUpdate: animeViewData?.userAnimeView ?? {
            id: 0,
            anime: animeData,
            status: AnimeViewStatus.None,
            episodeViews: [],
            lastEpisodeSeen: null,
            nextEpisodeToSee: null
          },
          newStatus: AnimeViewStatus.InProgress
        });
    }
  };

  if (loading || !isListPopulated)
    return (
      <View
        style={{
          minHeight: moderateVerticalScale(70),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  return (
    <View style={{ minHeight: moderateVerticalScale(70) }}>
      <FlatList
        ref={ref}
        data={arcEpisodeList}
        stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.episode.id.toString()}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: moderateVerticalScale(70),
          offset: moderateVerticalScale(70) * index,
          index
        })}
        onScrollToIndexFailed={() =>
          ref.current?.scrollToOffset({ offset: 0, animated: false })
        }
        // TODO : Fix auto scroll
        // onContentSizeChange={() =>
        //   ref.current.scrollToIndex({
        //     index: animeViewData?.userAnimeView?.nextEpisodeToSee?.number ?? 0,
        //     animated: false,
        //     viewPosition: 0.5
        //   })
        // }
        renderItem={({ item, index }) => (
          <EpisodeRow
            number={item.episode.number}
            title={item.episode.title}
            airedDate={item.episode.airedDate}
            isFiller={item.episode.isFiller}
            isRecap={item.episode.isRecap}
            isChecked={isCheckedList[index]}
            onCheckPress={() => onCheckPress(index, isCheckedList[index])}
          />
        )}
        ListHeaderComponent={
          <ArcHeader
            arcName={arcName}
            onArrowPress={onHeaderArrowPress}
            displayArrow={displayHeaderArrow}
            onCheckPress={onMultiCheckPress}
            isChecked={areAllCheckedInList}
            {...{ checkedCount, maxCount }}
          />
        }
        ListFooterComponent={
          onNextEpisodePressed ? (
            <ArcFooter {...{ onNextEpisodePressed }} />
          ) : null
        }
        ListEmptyComponent={
          <ListEmpty
            title={"Oups! \nIl n'y a rien à afficher ici."}
            subtitle={"(Vérifie ta connexion 👀)"}
          />
        }
      />
    </View>
  );
};

export default ArcFlatList;

interface ArcFlatListProps {
  animeData: AnimeDataFieldsFragment;
  arcName?: string;
  isLastArc: boolean;
  displayHeaderArrow?: boolean;
  onHeaderArrowPress?: () => void;
  onNextEpisodePressed?: () => void;
}
