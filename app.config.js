import "dotenv/config";

export default {
  expo: {
    name: "Ishiro",
    slug: "ishiro-mobile",
    version: "0.1.0",
    entryPoint: "./src/app/App.tsx",
    orientation: "portrait",
    icon: "./src/assets/icon.png",
    primaryColor: "#CE1126",
    backgroundColor: "#131313",
    splash: {
      image: "./src/assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#131313"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
      userInterfaceStyle: "dark"
    },
    android: {
      userInterfaceStyle: "dark",
      icon: "./src/assets/android_icon.png"
    },
    androidNavigationBar: {
      backgroundColor: "#131313"
    },
    extra: {
      apiEndpoint: process.env.EXPO_API_ENDPOINT
    }
  }
};
