import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable
} from "react-native";
import { Track } from "../../types";
import { colours } from "../../colours";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  track: Track;
  onPress?: (track: Track) => void;
  onRemove?: () => void;
};
const TrackResult = ({ track, onPress, onRemove }: Props) => {
  return (
    <Pressable onPress={() => onPress && onPress(track)}>
      <View style={styles.result}>
        <View>
          <Image src={track.thumbnail} height={50} width={50} />
        </View>
        <View style={styles.details}>
          <Text style={styles.artist}>{track.artist}</Text>
          <Text style={styles.track}>{track.title}</Text>
        </View>
        <View style={styles.duration}>
          <Text style={styles.length}>{track.duration}</Text>
        </View>
        {onRemove && (
          <View style={styles.remove}>
            <TouchableOpacity>
              <Ionicons name="close" size={24} color={colours.accent} onPress={onRemove}/>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  result: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colours.background,
    marginBottom: 2,
  },
  details: {
    marginLeft: 20,
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  artist: {
    color: colours.text,
  },
  track: {
    color: colours.text,
  },
  duration: {
    marginRight: 20,
    justifyContent: "center",
  },
  length: {
    color: colours.text,
  },
  remove: {
    display: "flex",
    flexDirection: "column",
    textAlignVertical: "center",
    alignContent: "center",
    justifyContent: "center",
  },
});
export { TrackResult };
