import "react-native-elements";

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

declare module "react-native-elements" {
  export interface Colors {
    white: string;
    black: string;
    grey6: string;
    grey7: string;
    grey8: string;
    grey9: string;
    info: string;
  }

  export interface FullTheme {
    colors: RecursivePartial<Colors>;
  }
}
