import * as Location from "expo-location";

type GeocodeComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type GeocodeResult = {
  address_components: GeocodeComponent[];
};

type GeocodeResponse = {
  results: GeocodeResult[];
  status: string;
};

export const getCityFromCoords = async (latitude: number, longitude: number) => {
  try {
    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (!place) return "Unknown";

    return (
      place.city ||
      place.region ||
      place.subregion ||
      place.district ||
      place.name ||
      "Unknown"
    );
  } catch (err) {
    console.error("Failed to reverse geocode:", err);
    return "Unknown";
  }
};


export const getBoundingBox = (lat: number, lng: number, distanceKm: number) => {
  const earthRadiusKm = 6371;
  const latDelta = distanceKm / earthRadiusKm;
  const lngDelta = distanceKm / (earthRadiusKm * Math.cos((Math.PI * lat) / 180));

  return {
    minLat: lat - latDelta,
    maxLat: lat + latDelta,
    minLng: lng - lngDelta,
    maxLng: lng + lngDelta,
  };
}
