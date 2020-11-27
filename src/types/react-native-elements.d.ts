import "react-native-elements";

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "react-native-elements" {
  export interface Colors {
    primaryLighter: string;
    white: string;
    black: string;
    grey6: string;
    grey7: string;
    grey8: string;
    grey9: string;
    info: string;
  }

  export interface Spacing {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
    "3xl": 100;
  }

  export interface BorderRadius {
    xs: number;
    s: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
    spacing: Spacing;
    borderRadii: BorderRadius;
  }
}
