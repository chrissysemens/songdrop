import { View, StyleSheet, FlatList } from "react-native";
import { colours } from "../../colours";
import { Track } from "../../types";
import { TrackResult } from "./search-result";

type Props = {
  tracks: Array<Track>;
  onSelect: (track: Track) => void;
};

export const TrackResults = ({ tracks, onSelect }: Props) => {
  return (
    <View style={styles.results}>
      <FlatList
        style={styles.list}
        data={tracks}
        renderItem={({ item }) => (
          <TrackResult track={item} onPress={onSelect} />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  results: {
    display: "flex",
    flex: 1,
    backgroundColor: colours.sheet,
    borderWidth: 1,
    marginTop: 30,
  },
  list: {
    flexGrow: 0,
  },
});
