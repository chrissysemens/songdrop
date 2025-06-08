import { LocationObjectCoords } from "expo-location";
import { Card } from "../../components/card";
import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { colours } from "../../colours";

type LocationPreviewProps = {
  location: LocationObjectCoords | null;
  city: string;
};

const LocationPreview = ({ location, city }: LocationPreviewProps) => {
  return (
    <Card
      height={220}
      width={350}
      borderColor={colours.primary}
      style={{ marginRight: 20 }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {location && (
          <>
            <Text style={styles.location}>Location</Text>
            <View style={styles.mapCols}>
              <View>
                <MapView
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                  }}
                />
              </View>
              <View style={styles.locInfo}>
                <Text style={styles.locTitle}>{city}</Text>
                <Text
                  style={styles.locText}
                >{`lat: ${location.latitude}`}</Text>
                <Text
                  style={styles.locText}
                >{`lng: ${location.longitude}`}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Card>
  );
};

export {LocationPreview };

const styles = StyleSheet.create({
 map: {
    flex: 1,
    height: 150,
    width: 150,
  },
  mapCols: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  },
  location: {
    color: colours.text,
    alignSelf: "center",
    fontWeight: "500",
    marginBottom: 10,
  },
    locInfo: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  locText: {
    color: colours.text,
    marginLeft: 20,
    marginBottom: 5,
  },
  locTitle: {
    color: colours.text,
    marginLeft: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
})