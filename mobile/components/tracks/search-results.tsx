import { FlatList, StyleSheet, View } from "react-native";
import { colours } from "../../colours";
import { Track } from "../../types";
import { TrackResult } from "./search-result";

type Props = {
  tracks: Array<Track>;
  onSelect: (track: Track) => void;
};

export const TrackResults = ({ tracks, onSelect}: Props) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tracks}
        renderItem={({ item }) => (
          <TrackResult track={item} onPress={onSelect} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        scrollEnabled
        nestedScrollEnabled
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    maxHeight: 375,
    backgroundColor: colours.sheet,
    borderRadius: 8,
    overflow: "hidden",
  },
  content: {
    paddingVertical: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#333',
  },
});
