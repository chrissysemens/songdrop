import { View, ScrollView, StyleSheet, useWindowDimensions } from "react-native";
import { Tile, TileProps } from "../components/tile";

type Props = {
  tiles: Array<TileProps>;
};

const Dashboard = ({ tiles }: Props) => {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  if (isTablet) {
    return (
      <View style={styles.gridContainer}>
        {tiles.map((tile: TileProps) => (
          <Tile key={tile.text} {...tile} />
        ))}
      </View>
    );
  }

  // Horizontal scroll on mobile
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.rowContainer}
    >
      {tiles.map((tile: TileProps) => (
        <Tile key={tile.text} {...tile} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    margin: 200,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: 16,
  },
  rowContainer: {
    flexDirection: "row",
    paddingTop: 20,
    alignItems: "flex-start",
    gap: 12,
  },
});

export { Dashboard };
