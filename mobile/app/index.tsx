import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import { makeRedirectUri } from "expo-auth-session";
import { colours } from "../colours";
import useAuthState from "../state/spotify-auth";
import { useRouter } from "expo-router";
import * as Linking from 'expo-linking';

const Index = () => {
  const { token, refreshToken, expiry, setExpiry, setToken } = useAuthState();
  const router = useRouter();

  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const res = await fetch(
          `https://europe-west2-songdrop-569af.cloudfunctions.net/api/refresh?refresh_token=${refreshToken}`
        );
        const data = await res.json();
        console.log('res', res);

        if (data.access_token && data.expires_in) {
          setToken(data.access_token);
          setExpiry(data.expires_in);

          setTimeout(() => router.replace("/home"), 500);
        } else {
          console.warn("Failed to refresh token:", data);
        }
      } catch (err) {
        console.error("Error refreshing token:", err);
      }
    };
    console.log(token);
    if (token && expiry && expiry > Date.now()) {
      setTimeout(() => router.replace("/home"), 500);
    }

    if (token && expiry && refreshToken && expiry <= Date.now()) {
      tryRefreshToken();
    }
  }, [token, refreshToken, expiry]);

  const handleLogin = async () => {
    const redirectUri = Linking.createURL("callback");
    const loginUrl = `https://europe-west2-songdrop-569af.cloudfunctions.net/api/login?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;
    Linking.openURL(loginUrl);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎵 Welcome to SongDrop</Text>
      <Text style={styles.subtitle}>Pin a Feeling. Drop a Song.</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login with Spotify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    color: colours.text,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colours.muted,
    marginBottom: 32,
  },
  button: {
    backgroundColor: colours.primary,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 50,
    shadowColor: colours.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    color: colours.background,
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});

export default Index;
