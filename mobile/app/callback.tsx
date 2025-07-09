import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import * as Linking from "expo-linking";
import useAuthState from "../state/spotify-auth";

export default function AuthCallback() {
  const router = useRouter();
  const localParams = useLocalSearchParams();
  const { setToken, setRefreshToken, setExpiry } = useAuthState();
  const [hasHandled, setHasHandled] = useState(false);

  useEffect(() => {
    const tryHandleAuth = async () => {
      if (hasHandled) return;

      let access_token = localParams?.access_token as string | undefined;
      let refresh_token = localParams?.refresh_token as string | undefined;
      let expires_in = localParams?.expires_in as string | undefined;

      // If missing, try fallback from initial URL
      if (!access_token || !expires_in) {
        const url = await Linking.getInitialURL();
        console.log("🔍 Fallback to Linking.getInitialURL():", url);
        if (!url) return;

        const parsed = Linking.parse(url);
        console.log("Parsed from initial URL:", parsed);

        const query = parsed.queryParams ?? {};
        const hashParams = parsed.fragment
          ? Object.fromEntries(new URLSearchParams(parsed.fragment))
          : {};

        access_token = (query.access_token || hashParams.access_token) as string;
        refresh_token = (query.refresh_token || hashParams.refresh_token) as string;
        expires_in = (query.expires_in || hashParams.expires_in) as string;
      }

      // Final check
      if (access_token && expires_in) {
        setHasHandled(true);
        console.log("✅ Final token used:", access_token);
        setToken(access_token);
        setRefreshToken(refresh_token || null);
        setExpiry(expires_in);
        router.replace("/home");
      } else {
        console.warn("⚠️ No access token or expiry found in callback.");
      }
    };

    tryHandleAuth();
  }, [localParams]);

  return null;
}
