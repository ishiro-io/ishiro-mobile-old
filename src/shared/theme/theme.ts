import { Theme } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import {
  moderateScale,
  moderateVerticalScale
} from "react-native-size-matters";

const theme: Theme = {
  Button: {
    buttonStyle: {
      width: moderateScale(310),
      borderRadius: moderateScale(1000),
      height: moderateVerticalScale(44)
    },
    titleStyle: {
      fontSize: RFValue(13),
      fontFamily: "Poppins_600SemiBold",
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: 1
    }
  },
  Input: {
    inputStyle: {
      color: "#fff",
      fontFamily: "Poppins_400Regular",
      fontSize: RFValue(12)
    },
    inputContainerStyle: {
      height: moderateVerticalScale(40),
      backgroundColor: "#2f2f2f",
      borderRadius: moderateScale(8),
      borderBottomWidth: 0,
      paddingLeft: moderateScale(8)
    },
    labelStyle: {
      fontFamily: "Poppins_500Medium",
      fontSize: RFValue(16),
      color: "#fff",
      marginBottom: moderateVerticalScale(8)
    },
    errorStyle: { fontSize: RFValue(10) }
  },
  Text: { style: { color: "#fff", fontFamily: "Poppins_400Regular" } },
  colors: {
    primary: "#CE1126",
    primaryLighter: "#E14649",
    white: "#FFF",
    black: "#131313",
    grey0: "##ededed",
    grey1: "#e1e1e1",
    grey2: "#d3d3d3",
    grey3: "#c4c4c4",
    grey4: "#b3b3b3",
    grey5: "#a0a0a0",
    grey6: "#898989",
    grey7: "#6c6c6c",
    grey8: "#3f3f3f",
    grey9: "#2f2f2f",
    success: "#62AD13",
    error: "#D32643",
    warning: "#C17005",
    info: "#0087C6"
  },
  spacing: {
    xs: moderateVerticalScale(4),
    s: moderateVerticalScale(8),
    m: moderateVerticalScale(16),
    l: moderateVerticalScale(24),
    xl: moderateVerticalScale(40),
    xxl: moderateVerticalScale(64),
    "3xl": moderateVerticalScale(100)
  },
  borderRadii: {
    xs: moderateScale(5),
    s: moderateScale(8),
    m: moderateScale(14),
    l: moderateScale(24),
    xl: moderateScale(30),
    xxl: moderateScale(40)
  },
  textSize: {
    xs: RFValue(8),
    s: RFValue(12),
    m: RFValue(16),
    l: RFValue(24),
    xl: RFValue(32),
    xxl: RFValue(64)
  }
};

export default theme;
