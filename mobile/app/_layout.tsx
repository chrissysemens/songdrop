import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Header } from "../components/header"; 
import { Shutter } from "../components/shutter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

const Layout = () => {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
};

export default Layout;
