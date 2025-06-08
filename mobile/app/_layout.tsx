import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components/header"; 
import { Shutter } from "../components/shutter";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";

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

export default Layout;
