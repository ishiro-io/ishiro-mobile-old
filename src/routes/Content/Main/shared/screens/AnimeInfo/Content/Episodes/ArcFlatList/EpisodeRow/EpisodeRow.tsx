import { MaterialCommunityIcons } from "@expo/vector-icons";
import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

const EpisodeRow: React.FC<EpisodeRowProps> = ({
  number,
  airedDate,
  title,
  isChecked,
  isFiller,
  isRecap,
  onCheckPress
}: EpisodeRowProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        width: "100%",
        height: moderateVerticalScale(70),
        paddingRight: theme.spacing?.m,
        borderBottomWidth: 1,
        borderColor: theme.colors?.grey8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <View
        style={{
          width: moderateScale(240),
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_100Thin",
            fontSize: 35,
            textAlign: "center",
            width: moderateScale(60)
          }}
        >
          {number.toLocaleString("fr-FR", {
            minimumIntegerDigits: 2,
            useGrouping: false
          })}
        </Text>
        <View>
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontSize: theme.textSize.s
            }}
          >
            {title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingTop: theme.spacing.xs
            }}
          >
            {airedDate && (
              <Text
                style={{
                  fontFamily: "Poppins_200ExtraLight",
                  fontSize: theme.textSize.s
                }}
              >
                {format(parseISO(airedDate), "dd MMMM yyyy", { locale: fr })}
              </Text>
            )}

            {isFiller && (
              <View
                style={{
                  backgroundColor: theme.colors?.grey8,
                  height: moderateVerticalScale(14),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: theme.borderRadii?.xs,
                  paddingHorizontal: theme.spacing?.s,
                  marginHorizontal: theme.spacing?.s
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: theme.textSize.xs
                  }}
                >
                  Filler
                </Text>
              </View>
            )}

            {isRecap && (
              <View
                style={{
                  backgroundColor: theme.colors?.grey8,
                  height: moderateVerticalScale(16),
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: theme.borderRadii?.xs,
                  paddingHorizontal: theme.spacing?.s,
                  marginLeft: theme.spacing?.s
                }}
              >
                <Text
                  style={{
                    fontFamily: "Poppins_300Light",
                    fontSize: theme.textSize.xs
                  }}
                >
                  Récapitulatif
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <TouchableWithoutFeedback
        onPress={onCheckPress}
        style={{
          width: moderateScale(32),
          height: moderateScale(32),
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <MaterialCommunityIcons
          name="checkbox-marked-circle-outline"
          size={moderateScale(24, 0.1)}
          color={isChecked ? theme.colors?.success : theme.colors?.grey6}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default EpisodeRow;

interface EpisodeRowProps {
  number: number;
  title?: string;
  airedDate?: string;
  isChecked: boolean;
  isFiller: boolean;
  isRecap: boolean;
  onCheckPress: () => void;
}
