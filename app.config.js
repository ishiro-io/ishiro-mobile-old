import "dotenv/config";

export default {
  expo: {
    name: "Ishiro",
    slug: "ishiro-mobile",
    version: "1.0.0",
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
      userInterfaceStyle: "dark",
      bundleIdentifier: "io.ishiro.app",
      buildNumber: "1.0.0.1"
    },
    android: {
      icon: "./src/assets/android_icon.png",
      package: "io.ishiro.app",
      userInterfaceStyle: "dark",
      versionCode: 1
    },
    androidNavigationBar: {
      backgroundColor: "#131313"
    },
    extra: {
      apiEndpoint: process.env.EXPO_API_ENDPOINT,
      googleExpoClientId: process.env.EXPO_GOOGLE_EXPO_CLIENT_ID,
      googleUserApiEndpoint: process.env.EXPO_GOOGLE_USER_API_ENDPOINT,
      googleIosAppId: process.env.EXPO_GOOGLE_IOS_APP_ID,
      googleAndroidAppId: process.env.EXPO_GOOGLE_ANDROID_APP_ID
    }
  }
};
