import { create } from "zustand";
import * as Location from "expo-location";

type LocationState = {
  location: Location.LocationObjectCoords | null;
  setLocation: (location: Location.LocationObjectCoords) => void;
  city: string;
  setCity: (city: string) => void;
};

export const useLocation = create<LocationState>((set) => ({
  location: null,
  setLocation: (location: Location.LocationObjectCoords | null) =>
    set(() => ({ location })),
  city: 'Unknown',
  setCity: ((city: string) => set({ city: city }))
}));
