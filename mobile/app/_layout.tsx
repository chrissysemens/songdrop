import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/header"; 
import { Shutter } from "../components/shutter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://3ee4289679ba3efb7adedf96123933c0@o4509496297127936.ingest.de.sentry.io/4509496298438736',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

WebBrowser.maybeCompleteAuthSession();

const Layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <Header />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Shutter />
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "fade",
          }}
        />
      </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(Layout);