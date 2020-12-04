import { useIsFocused, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  AppStateStatus,
  Dimensions,
  View
} from "react-native";
import { ThemeContext } from "react-native-elements";
import { FlatList } from "react-native-gesture-handler";

import { ListEmpty } from "components";
import {
  EpisodeWithStatusFieldsFragment,
  NewEpisodeStatus,
  useUserEpisodesStatusQuery
} from "shared/graphql/generated";
import { useSetUserEpisodesStatus, useUpdateEffect } from "shared/hooks";
import { AnimeInfoTabNavigationProps } from "shared/navigation/NavigationProps";

import { ArcFooter } from "./ArcFooter";
import { ArcHeader } from "./ArcHeader";
import { EpisodeRow } from "./EpisodeRow";

const { height } = Dimensions.get("screen");

const ArcFlatList: React.FC<ArcFlatListProps> = ({
  arcName,
  displayHeaderArrow = false,
  onHeaderArrowPress,
  onNextEpisodePressed
}: ArcFlatListProps) => {
  const { theme } = useContext(ThemeContext);

  const isFocused = useIsFocused();

  const route = useRoute<AnimeInfoTabNavigationProps<"Episodes">["route"]>();

  const ref = useRef<FlatList<any> | null>(null);

  const { data, loading } = useUserEpisodesStatusQuery({
    variables: {
      animeId: route.params.animeId
    }
  });

  const setUserEpisodesStatus = useSetUserEpisodesStatus();

  const [appState, setAppState] = useState(AppState.currentState);
  const [hasChanged, setHasChanged] = useState(false);

  const [arcEpisodeList, setArcEpisodeList] = useState<
    EpisodeWithStatusFieldsFragment[]
  >([]);
  const [isListPopulated, setIsListPopulated] = useState(false);

  const [isCheckedList, setIsCheckedList] = useState<boolean[]>([]);
  const [areAllChecked, setAreAllChecked] = useState(false);

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
      const newArcEpisodeList = (data?.userEpisodesStatus ?? []).filter(
        (ues) => {
          return !ues.episode.arcName || ues.episode.arcName === arcName;
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
        (ues) => ues.status?.hasBeenSeen || false
      );

      setIsCheckedList(newIsCheckledList);
    }
  }, [arcEpisodeList]);

  // ? Call mutation and consolidate list when we loose focus
  useUpdateEffect(() => {
    if (
      arcEpisodeList &&
      data?.userEpisodesStatus &&
      (!isFocused || appState.match(/inactive|background/)) &&
      hasChanged
    ) {
      setIsListPopulated(false);

      const newCheckedEpisode: NewEpisodeStatus[] = isCheckedList.map(
        (isChecked, index) => {
          const ues = arcEpisodeList[index];
          return { episodeNumber: ues.episode.number, toSeen: isChecked };
        }
      );

      const firstSeenEpisode = newCheckedEpisode.find(
        (nes) => nes.toSeen === true
      );

      let newEpisodeStatus = [...newCheckedEpisode];

      if (firstSeenEpisode) {
        const previousEpisodes = data?.userEpisodesStatus.filter(
          (ues) => ues.episode.number < firstSeenEpisode.episodeNumber
        );

        const previousEpisodesNewStatus = previousEpisodes.map<NewEpisodeStatus>(
          (episodeStatus) => {
            return {
              episodeNumber: episodeStatus.episode.number,
              toSeen: true
            };
          }
        );

        newEpisodeStatus = [...newCheckedEpisode, ...previousEpisodesNewStatus];
      }

      setUserEpisodesStatus({
        arcName,
        input: {
          animeId: route.params.animeId,
          newEpisodeStatus
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

    if (count >= maxCount) setAreAllChecked(true);
    else setAreAllChecked(false);

    setCheckedCount(count);
  }, [isCheckedList]);

  // ? Call when check is pressed in EpisodeRow
  // ? when the icon wasn't check, check every icon before it
  // ? when it was already checked, just uncheck this icon
  const onCheckPress = (index: number, toSeen: boolean) => {
    if (data?.userEpisodesStatus) {
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

  if (loading || !isListPopulated)
    return (
      <View
        style={{
          minHeight: height * 0.1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <ActivityIndicator color={theme.colors?.white} />
      </View>
    );

  return (
    <View style={{ minHeight: height * 0.1 }}>
      <FlatList
        ref={ref}
        data={arcEpisodeList}
        renderItem={({ item, index }) => (
          <EpisodeRow
            number={item.episode.number}
            title={item.episode.title}
            airedDate={item.episode.airedDate}
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
            isChecked={areAllChecked}
            {...{ checkedCount, maxCount }}
          />
        }
        ListFooterComponent={
          onNextEpisodePressed ? (
            <ArcFooter {...{ onNextEpisodePressed }} />
          ) : null
        }
        stickyHeaderIndices={[0]}
        keyExtractor={(item) => item.episode.id.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <ListEmpty
            title={"Oups! \nIl n'y a rien à afficher ici."}
            subtitle={"(Vérifie ta connexion 👀)"}
          />
        }
        onScrollToIndexFailed={() =>
          ref.current?.scrollToOffset({ offset: 0, animated: false })
        }
      />
    </View>
  );
};

export default ArcFlatList;

interface ArcFlatListProps {
  arcName?: string | null | undefined;
  displayHeaderArrow?: boolean;
  onHeaderArrowPress?: () => void;
  onNextEpisodePressed?: () => void;
}
