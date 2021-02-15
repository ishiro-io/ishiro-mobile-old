import { Theme } from "react-native-elements";
import { RFPercentage } from "react-native-responsive-fontsize";

const theme: Theme = {
  Input: {
    inputStyle: {
      color: "#fff",
      fontFamily: "Poppins_400Regular",
      fontSize: RFPercentage(2)
    },
    inputContainerStyle: {
      height: RFPercentage(5),
      backgroundColor: "#2f2f2f",
      borderRadius: 8,
      borderBottomWidth: 0,
      paddingLeft: 8
    },
    labelStyle: {
      fontFamily: "Poppins_500Medium",
      fontSize: RFPercentage(2.5),
      color: "#fff",
      marginBottom: 8
    },
    errorStyle: {
      fontSize: RFPercentage(1.5)
    }
  },
  Button: {
    buttonStyle: {
      borderRadius: 60,
      height: RFPercentage(7),
      maxWidth: 520
    },
    titleStyle: {
      fontSize: RFPercentage(2),
      fontFamily: "Poppins_600SemiBold",
      textTransform: "uppercase",
      textAlign: "center",
      letterSpacing: 1
    },
    containerStyle: {
      marginBottom: RFPercentage(2)
    }
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
    xs: RFPercentage(1),
    s: RFPercentage(1.5),
    m: RFPercentage(2),
    l: RFPercentage(4),
    xl: RFPercentage(8),
    xxl: RFPercentage(9),
    "3xl": 100
  },
  borderRadii: {
    xs: 5,
    s: 8,
    m: 14,
    l: 24,
    xl: 30,
    xxl: 60
  },
  textsize: {
    xs: RFPercentage(1.5),
    s: RFPercentage(2),
    m: RFPercentage(2.5),
    l: RFPercentage(3),
    xl: RFPercentage(4),
    xxl: RFPercentage(8)
  }
};

export default theme;
