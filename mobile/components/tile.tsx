import { View, Text, ColorValue, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import type { SvgProps } from "react-native-svg";
import { FC } from "react";

export type TileProps = {
  text: string;
  Icon: FC<SvgProps>;
  height: number;
  width: number;
  colour: ColorValue;
  onPress: () => void;
};

const screenWidth = Dimensions.get("window").width;
const isTablet = screenWidth >= 768;

const Tile = ({ text, Icon, height, width, colour, onPress }: TileProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View style={[styles.tile, { height, width, borderColor: colour }]}>
      <View>
        <Text style={[styles.text, { color: colour }]}>{text}</Text>
      </View>
      <View>
        <Icon height={50} width={50} color={colour} />
      </View>
    </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tile: {
    margin: isTablet ? 15 : 10,
    borderWidth: 2,
    padding: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: isTablet ? 24 : 17,
    fontWeight: "bold",
    marginBottom: 20,
  },
  icon: {
    marginBottom: 20,
  },
});

export { Tile };
