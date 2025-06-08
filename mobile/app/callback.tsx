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

      let access_token = localParams?.access_token;
      let refresh_token = localParams?.refresh_token;
      let expires_in = localParams?.expires_in;

      if (access_token && expires_in) {
        console.log("✅ Received token from local params:", access_token);
      } else {
        const url = await Linking.getInitialURL();
        console.log("🔍 Fallback to Linking.getInitialURL():", url);
        if (!url) return;

        const parsed = Linking.parse(url);
        console.log("Parsed from initial URL:", parsed);

        const query = parsed.queryParams ?? {};
        access_token = query.access_token as string;
        refresh_token = query.refresh_token as string;
        expires_in = query.expires_in as string;
      }

      if (access_token && expires_in) {
        setHasHandled(true);
        console.log("✅ Final token used:", access_token);
        setToken(access_token as string);
        setRefreshToken(refresh_token ? (refresh_token as string) : null);
        setExpiry(expires_in as string);
        router.replace("/home");
      }
    };

    tryHandleAuth();
  }, [localParams]);

  return null;
}
