import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { SecureStorage } from "../utils/secureStorage";

type AuthState = {
  token: string | null;
  refreshToken: string | null;
  expiry: number | null;
  setToken: (token: string) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  setExpiry: (expires_in: string | null) => void;
};

export const useAuthState = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      expiry: null,
      setToken: (token: string) => set(() => ({ token })),
      setRefreshToken: (refreshToken: string | null) =>
        set(() => ({
          refreshToken,
        })),
      setExpiry: (expires_in: string | null) =>
        set((state) => {
          if (expires_in) {
            const remaining = parseInt(expires_in) * 1000;
            const expiry = Date.now() + remaining;
            return { ...state, expiry };
          }
          return state;
        }),
    }),
    {
      name: "spotify-auth",
      storage: createJSONStorage(() => SecureStorage),
      version: 1,
    }
  )
);

export default useAuthState;
