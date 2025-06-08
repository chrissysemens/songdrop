import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2/options";
import { defineSecret } from "firebase-functions/params";
import express from "express";
import axios from "axios";

setGlobalOptions({ region: "europe-west2" });

const SPOTIFY_CLIENT_ID = defineSecret("SPOTIFY_CLIENT_ID");
const SPOTIFY_CLIENT_SECRET = defineSecret("SPOTIFY_CLIENT_SECRET");

const app = express();

app.get("/login", async (req, res) => {
  try {
    const redirectUri = req.query.redirect_uri as string;
    if (!redirectUri) return res.status(400).send("Missing redirect_uri");

    const state = encodeURIComponent(JSON.stringify({ redirectUri }));

    const params = new URLSearchParams({
      response_type: "code",
      client_id: await SPOTIFY_CLIENT_ID.value(),
      scope: "user-read-email user-read-private",
      redirect_uri:
        "https://europe-west2-songdrop-569af.cloudfunctions.net/api/callback",
      state,
    });

    res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/callback", async (req, res) => {
  const code = req.query.code as string;
  const rawState = req.query.state as string;

  if (!code || !rawState) {
    return res.status(400).send("Missing code or state");
  }

  let redirectUri: string;
  try {
    const parsed = JSON.parse(decodeURIComponent(rawState));
    redirectUri = parsed.redirectUri;
  } catch {
    return res.status(400).send("Invalid state");
  }

  try {
    const [clientId, clientSecret] = await Promise.all([
      SPOTIFY_CLIENT_ID.value(),
      SPOTIFY_CLIENT_SECRET.value(),
    ]);

    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        code,
        redirect_uri:
          "https://europe-west2-songdrop-569af.cloudfunctions.net/api/callback",
        grant_type: "authorization_code",
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    const redirectUrl = new URL(redirectUri);
    redirectUrl.searchParams.set("access_token", access_token);
    redirectUrl.searchParams.set("refresh_token", refresh_token);
    redirectUrl.searchParams.set("expires_in", expires_in.toString());

    res.send(`
      <html>
        <head>
          <title>Redirecting...</title>
          <script>
            window.location.href = "${redirectUrl.toString()}";
          </script>
        </head>
        <body>
          <p>Redirecting back to the app...</p>
        </body>
      </html>
    `);
  } catch (err: any) {
    console.error("Error in callback:", err.response?.data || err);
    res.status(500).send("Failed to get tokens");
  }
});

app.get("/refresh", async (req, res) => {
  const refreshToken = req.query.refresh_token as string;

  if (!refreshToken) {
    return res.status(400).json({ error: "Missing refresh_token" });
  }

  try {
    const [clientId, clientSecret] = await Promise.all([
      SPOTIFY_CLIENT_ID.value(),
      SPOTIFY_CLIENT_SECRET.value(),
    ]);

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization:
            "Basic " +
            Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
        },
      }
    );

    const { access_token, expires_in } = response.data;

    if (!access_token || !expires_in) {
      return res
        .status(500)
        .json({ error: "Invalid Spotify refresh response" });
    }

    return res.json({
      access_token,
      expires_in,
    });
  } catch (error: any) {
    console.error(
      "Error refreshing Spotify token:",
      error.response?.data || error
    );
    return res.status(500).json({ error: "Failed to refresh token" });
  }
});

export const api = onRequest(
  {
    secrets: [SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET],
  },
  app
);
