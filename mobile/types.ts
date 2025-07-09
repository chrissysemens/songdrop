import { ViewStyle } from "react-native";

export type IconProps = {
  size?: number;
  style?: ViewStyle;
  colour?: string;
};

export type Track = {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration: string;
  uri: string;
  previewUrl: string;
};

export type Drop = {
  userId: string;
  track: Track | null;
  privacy: Privacy;
  genre: Genre;
  category: Category;
  emoji: string;
  longitude: number;
  latitude: number;
  collectFrom: CollectFrom;
  collectRadius: number;
  expiryType: ExpiryType;
  expiry: number;
  created: number;
  notes: string;
  collectedCount: number;
  likeCount: number;
};


export type LabelValueWithEmoji<T extends string = string> = {
  label: string;
  value: T;
  emoji: string;
};

export type Privacy = "public" | "private";

export type CollectFrom = "anywhere" | "range";

export type ExpiryType = "never" | "duration";

export type Genre =
  | "ambient"
  | "blues"
  | "chill"
  | "classical"
  | "country"
  | "dance"
  | "deep-house"
  | "drum-bass"
  | "edm"
  | "electronic"
  | "folk"
  | "funk"
  | "gospel"
  | "grime"
  | "hip-hop"
  | "house"
  | "indie"
  | "industrial"
  | "jazz"
  | "k-pop"
  | "latin"
  | "lofi"
  | "metal"
  | "minimal-techno"
  | "pop"
  | "post-rock"
  | "rnb"
  | "rap"
  | "reggae"
  | "rock"
  | "shoegaze"
  | "soul"
  | "soundtrack"
  | "synthwave"
  | "techno"
  | "trip-hop"
  | "world";

 
export type Category =
  | "chill"
  | "discovery"
  | "gig"
  | "growth"
  | "heartbreak"
  | "hype"
  | "love"
  | "memory"
  | "party"
  | "reflection"
  | "roadtrip"
  | "travel"
  | "vibe"; 
