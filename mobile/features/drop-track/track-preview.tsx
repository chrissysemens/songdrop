import { View, Text, StyleSheet, Image } from "react-native";
import { colours } from "../../colours";
import { Card } from "../../components/card";
import { Track } from "../../types";

type TrackPreviewProps = {
  selectedTrack: Track | null;
};

const TrackPreview = ({ selectedTrack }: TrackPreviewProps) => {
  return (
    <Card height={220} width={350} borderColor={colours.accent}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {selectedTrack && (
          <>
            <Text style={styles.track}>Track</Text>
            <View style={styles.mapCols}>
              <View>
                <Image
                  src={selectedTrack?.thumbnail ?? ""}
                  height={155}
                  width={150}
                />
              </View>
              <View style={styles.locInfo}>
                <Text style={styles.locTitle}>{selectedTrack.artist}</Text>
                <Text style={styles.locText}>{selectedTrack.title}</Text>
                <Text
                  style={styles.locText}
                >{`Duration: ${selectedTrack.duration}`}</Text>
              </View>
            </View>
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  track: {
    color: colours.text,
    alignSelf: "center",
    fontWeight: "500",
    marginBottom: 10,
  },
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
});

export { TrackPreview };
