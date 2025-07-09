import { create } from "zustand";
import { ReactNode } from "react";
import { Drop } from "../types";
import { daysToMilliSeconds } from "../utils/general";

type GlobalState = {
  drop: Drop;
  setDrop: (drop: Drop) => void;
};

export const emptyDrop: Drop = {
  userId: '',
  track: null,
  privacy: 'public',
  genre: 'ambient',
  category: 'memory',
  emoji: "🧠",
  longitude: 0,
  latitude: 0,
  collectFrom: "range",
  collectRadius: 5,
  created: Date.now(),
  expiryType: "duration",
  expiry: Date.now() + daysToMilliSeconds(5),
  notes: '',
  collectedCount: 0,
  likeCount: 0,
};

export const useGlobalState = create<GlobalState>((set) => ({
  drop: emptyDrop,
  setDrop: (drop: Drop) => set(() => ({ drop })),
}));
