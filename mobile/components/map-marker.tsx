import { View, Text, StyleSheet } from "react-native";
import { Drop } from "../types";
import { Marker } from "react-native-maps";
import { useEffect, useState } from "react";

type MarkerProps = {
  drop: Drop;
  onPress: (drop: Drop) => void; 
};

const MapMarker = ({ drop, onPress }: MarkerProps) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <Marker
      coordinate={{
        latitude: drop.latitude,
        longitude: drop.longitude,
      }}
        tracksViewChanges={!ready}
        onPress={() => onPress(drop)}
    >
      <View style={styles.marker}>
        <Text style={styles.emoji}>{drop.emoji}</Text>
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  marker: {
    backgroundColor: "white",
    padding: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 20,
  },
});

export { MapMarker };
