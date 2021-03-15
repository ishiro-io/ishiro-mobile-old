import React, { useContext } from "react";
import { View } from "react-native";
import { Text, ThemeContext } from "react-native-elements";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

const Statistic: React.FC<StatisticProps> = ({
  title,
  value
}: StatisticProps) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flexDirection: "row",
        height: moderateVerticalScale(40),
        width: moderateScale(300),
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: theme.colors.primaryLighter,
        borderWidth: moderateVerticalScale(2),
        borderRadius: theme.borderRadii.m,
        marginVertical: theme.spacing.s
      }}
    >
      <View
        style={{
          backgroundColor: theme.colors.primaryLighter,
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: theme.spacing.m,
          height: moderateVerticalScale(40),
          borderRadius: theme.borderRadii.m
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: theme.textSize.s,
            color: theme.colors?.black
          }}
        >
          {title}
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",

          flexGrow: 1,
          height: moderateVerticalScale(40)
        }}
      >
        <Text
          style={{
            fontFamily: "Poppins_500Medium",
            fontSize: theme.textSize.s,
            color: theme.colors?.white
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

export default Statistic;

interface StatisticProps {
  title: string;
  value: string;
}
