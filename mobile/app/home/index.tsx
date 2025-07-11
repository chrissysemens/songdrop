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
import { getBoundingBox, getCityFromCoords } from "../../utils/location";
import { useFirebase } from "../../hooks/useFirebase";
import { Drop } from "../../types";
import { QueryConstraint, orderBy, where, limit } from "firebase/firestore";
import { daysToMilliSeconds } from "../../utils/general";
import { SelectedDrop } from "../../components/drops/selected-drop";

const screenWidth = Dimensions.get('window').width;
const isTablet = screenWidth >= 768;

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [activePill, setActivePill] = useState<string>("Near");
  const { location, setLocation, setCity } = useLocation();
  const [constraints, setConstraints] = useState<QueryConstraint[]>([]);
  const [selectedDrop, setSelectedDrop] = useState<Drop | null>(null);

  const { openSheet } = useInteractions();

  const pills = [
    {
      name: "Recent",
      onPress: () => {
        setActivePill("Recent");
        setConstraints([
          where("created", ">=", Date.now() - daysToMilliSeconds(3)),
        ]);
      },
    },
    {
      name: "Near",
      onPress: () => {
        setActivePill("Near");
        if (!location || !location.latitude || !location.longitude) {
          alert("No location"); // TODO: Better handling location
        }
        const box = getBoundingBox(
          location!.latitude,
          location!.longitude,
          100
        );

        setConstraints([
          where("latitude", ">=", box.minLat),
          where("latitude", "<=", box.maxLat),
          where("longitude", ">=", box.minLng),
          where("longitude", "<=", box.maxLng),
        ]);
      },
    },
    {
      name: "Most liked",
      onPress: () => {
        setActivePill("Most liked");
        setConstraints([
          where("likeCount", ">=", 1),
          orderBy("likeCount"),
          limit(10),
        ]);
      },
    },
    {
      name: "Top collected",
      onPress: () => {
        setActivePill("Top collected");
        setConstraints([
          where("collectedCount", ">=", 1),
          orderBy("collectedCount"),
          limit(10),
        ]);
      },
    },
    { name: "For you", onPress: () => setActivePill("For you") },
  ];

  const { data: drops } = useFirebase<Drop>({
    collectionName: "tracks",
    constraints,
  });

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
      <SelectedDrop
        drop={selectedDrop}
        onClosePress={() => setSelectedDrop(null)}
      />
      <View style={styles.mapView}>
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
              onPress={(drop: Drop) => {

                setSelectedDrop(drop);
              }}
            />
          ))}
      </MapView>
      </View>
      <View style={styles.pills}>
        <Pills pills={pills} activePill={activePill} />
      </View>
      <Dashboard
        tiles={[
          {
            text: "Drop a track",
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
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
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
            colour: colours.primary,
            Icon: VinylIcon,
            onPress: () => console.log("collected"),
          },
          {
            text: "Drops",
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
            colour: colours.primary,
            Icon: DropIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Leaderboard",
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
            colour: colours.primary,
            Icon: LeagueIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Profile",
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
            colour: colours.primary,
            Icon: ProfileIcon,
            onPress: () => console.log("drop"),
          },
          {
            text: "Settings",
            height: isTablet ? 200 : 150,
            width: isTablet ? 200 : 150,
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
  mapView: {
        height: isTablet ? 500 : 300,
        position: 'relative',
        zIndex: 0,
  },
  map: {
    borderWidth: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
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
