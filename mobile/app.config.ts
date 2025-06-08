import { ExpoConfig, ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  name: "Songdrop",
  slug: "songdrop",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  scheme: "songdrop",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  updates: {
    enabled: false,
  },
  ios: {
    supportsTablet: true,
    jsEngine: "hermes",
  },
  android: {
    edgeToEdgeEnabled: true,
    package: "com.chrissysemens.songdrop",
    permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    jsEngine: "hermes",
    config: {
      googleMaps: {
        apiKey: process.env.GOOGLE_MAPS_API_KEY,
      },
    },
    intentFilters: [
      {
        action: "VIEW",
        data: [
          {
            scheme: "songdrop",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  plugins: ["expo-router", "expo-web-browser", "expo-secure-store"],
  extra: {
    router: {},
    eas: {
      projectId: "5416bf2e-08ad-439c-99ec-acb04dd3b623",
    },
  },
});
