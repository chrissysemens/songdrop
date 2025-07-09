import {
  FlatList,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { colours } from "../colours";

type Pill = {
  name: string;
  onPress: () => void;
};

type PillsProps = {
  pills: Array<Pill>;
  activePill: string;
};

const screenWidth = Dimensions.get("window").width;


const Pills = ({ pills, activePill }: PillsProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={styles.listContent}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: pill }) => (
          <TouchableOpacity
            style={[styles.pill, pill.name === activePill && styles.active]}
            onPress={pill.onPress}
          >
            <Text style={[styles.pillText, pill.name === activePill && styles.activeText]}>{pill.name}</Text>
          </TouchableOpacity>
        )}
        data={pills}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: screenWidth,
    alignSelf: 'stretch',
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    paddingVertical: 10,
    backgroundColor: colours.background,
  },
  listContent: {
    display: "flex",
    flexGrow: 1,
    paddingHorizontal: 10,
    gap: 15,
    maxWidth: 1000,
  },
  pill: {
    backgroundColor: colours.surface,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    gap: 5,
    borderWidth: 1,
    borderColor: colours.primary,
  },
  active: {
    backgroundColor: colours.primary,
  },
  activeText: {
        color: colours.background,
  },
  pillText: {
    color: colours.text,
    fontWeight: "600",
  },
});

export { Pills };
