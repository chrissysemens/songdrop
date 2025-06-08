import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colours } from "../../colours";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { Pills } from "../../components/pills";
import { MapMarker } from "../../components/map-marker";
import { Dashboard } from "../../features/dashboard";
import VinylIcon from "../../svg/vinyl";
import DropIcon from "../../svg/drop";
import LeagueIcon from "../../svg/league";
import ProfileIcon from "../../svg/profile";
import SettingsIcon from "../../svg/settings";
import PinIcon from "../../svg/pin";
import { useInteractions } from "../../state/interactions";
import { DropTrack } from "../../features/drop-track/index";
import { useLocation } from "../../state/location";
import { getCityFromCoords } from "../../utils/location";
import { useFirebase } from "../../hooks/useFirebase";
import { Drop } from "../../types";
import { QueryConstraint, where } from "firebase/firestore";
import { daysToMilliSeconds } from "../../utils/general";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activePill, setActivePill] = useState<string>("Near");
  const { location, setLocation, setCity } = useLocation();
  const [constraints, setConstraints] = useState<QueryConstraint[]>([]);

  const { openSheet } = useInteractions();

  const pills = [
    {
      name: "Recent",
      onPress: () => {
        setConstraints([where("created", ">=", Date.now() - daysToMilliSeconds(3))])
        setActivePill("Recent");
      },
    },
    { name: "Near", onPress: () => setActivePill("Near") },
    { name: "Most liked", onPress: () => setActivePill("Most liked") },
    { name: "Top collected", onPress: () => setActivePill("Top collected") },
    { name: "For you", onPress: () => setActivePill("For you") },
  ];

  const { data: drops } = useFirebase<Drop>({ collectionName: "tracks", constraints });

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        console.log("🔍 Requesting location permission...");
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log("📍 Permission status:", status);
        if (status !== "granted") {
          console.warn("🚫 Location permission denied");
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        console.log("✅ Got location:", loc);
        if (isMounted) {
          setLocation(loc.coords);
        }

        const city = await getCityFromCoords(
          loc.coords.latitude,
          loc.coords.longitude
        );
        console.log("🏙️ City resolved:", city);
        setCity(city);
      } catch (error) {
        console.error("❌ Failed to get location:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={colours.primary} />
      </SafeAreaView>
    );
  }

  if (!location) {
    return (
      <SafeAreaView style={styles.centeredContainer}>
        <Text style={{ color: colours.text }}>Location unavailable</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {drops &&
          drops.map((drop: Drop) => (
            <MapMarker
              key={`marker-${drop.longitude}-${drop.latitude}-${drop.created}`}
              drop={drop}
            />
          ))}
      </MapView>
      <View style={styles.pills}>
        <Pills pills={pills} activePill={activePill} />
      </View>
      <Dashboard
        tiles={[
          {
            text: "Drop a track",
            height: 204,
            width: 204,
            colour: colours.primary,
            Icon: PinIcon,
            onPress: () => {
              openSheet({
                content: <DropTrack />,
                isOpen: true,
              });
            },
          },
          {
            text: "Collected",
            height: 200,
            width: 200,
            colour: colours.primary,
            Icon: VinylIcon,
            onPress: () => console.log("collected"),
          },
          {
            text: "Drops",
            height: 200,
            width: 200,
            colour: colours.primary,
            Icon: DropIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Leaderboard",
            height: 200,
            width: 200,
            colour: colours.primary,
            Icon: LeagueIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Profile",
            height: 200,
            width: 200,
            colour: colours.primary,
            Icon: ProfileIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Settings",
            height: 204,
            width: 204,
            colour: colours.primary,
            Icon: SettingsIcon,
            onPress: () => console.log("drop"),
          },
        ]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.background,
  },
  map: {
    borderWidth: 1,
    width: Dimensions.get("window").width,
    height: 500,
  },
  pills: {
    marginTop: 10,
  },
  centeredContainer: {
    flex: 1,
    backgroundColor: colours.background,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
