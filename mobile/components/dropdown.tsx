import React, { useRef}  from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ScrollView,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { AntDesign } from "@expo/vector-icons";
import { colours } from "../colours";

type Option = {
  label: string;
  value: string | number;
  emoji?: string;
};

type Props = {
  open: boolean;
  options: Option[];
  value: string | number;
  onOpen: (open: boolean) => void;
  onChange: (value: string | number) => void;
  style?: ViewStyle;
};

export const Dropdown = ({ open, onOpen, options, value, onChange, style }: Props) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const optionsRef = useRef<ScrollView>(null)

  const toggle = () => {
    const toValue = open ? 0 : 1;
    if(optionsRef && optionsRef.current) {
      optionsRef.current.scrollTo({ y: 0, animated: false });
    }
    scale.value = withSpring(toValue, { damping: 15 });
    opacity.value = withTiming(toValue);
    onOpen(!open);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const calculatedMinHeight = open
      ? options.length > 6
        ? 6 * 52
        : (options.length * 52) + 30
      : 0;
    return {
      minHeight: calculatedMinHeight,
      maxHeight: calculatedMinHeight,
      opacity: opacity.value,
    };
  });

  const selected = options.find((opt) => opt.value === value);

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.header} onPress={toggle}>
        <View style={styles.selected}>
          {selected?.emoji && (
            <Text style={styles.emoji}>{selected.emoji}</Text>
          )}
          <Text style={styles.label}>{selected?.label}</Text>
        </View>
        <View style={styles.direction}>
          <AntDesign
            name={open ? "up" : "down"}
            size={16}
            color={colours.text}
          />
        </View>
      </TouchableOpacity>
      <Animated.View
        style={[
          styles.dropdown,
          animatedStyle,
          {
            position: "absolute",
            top: 52,
            width: "100%",
            zIndex: 100,
          },
        ]}
      >
        <ScrollView
          ref={optionsRef}
          style={{ maxHeight: 6 * 52, elevation: 100 }} // 6 items
          contentContainerStyle={{ paddingVertical: 4 }}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
        >
          {options.map((item, index) => (
            <TouchableOpacity
              key={item.value.toString()}
              style={[
                styles.option,
                index !== 0 && styles.topBorder,
                index === options.length - 1 && styles.last,
              ]}
              delayPressIn={200}
              onPress={() => {
                onChange(item.value);
                toggle();
              }}
            >
              <View style={styles.optionValues}>
                {item.emoji && <Text style={styles.emoji}>{item.emoji}</Text>}
                <Text style={styles.label}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    minWidth: 180,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#333",
    borderRadius: 8,
  },
  selected: {
    flexDirection: "row",
    alignItems: "center",
  },
  emoji: {
    marginRight: 10,
  },
  label: {
    color: colours.text,
    fontSize: 16,
  },
  dropdown: {
    marginTop: 3,
    backgroundColor: "#222",
    borderRadius: 8,
    overflow: "hidden",
  },
  direction: {
    justifyContent: "center",
  },
  option: {
    marginTop: 2,
    padding: 16,
  },
  topBorder: {
    borderTopWidth: 1,
    borderColor: colours.background,
  },
  last: {
    marginBottom: 2,
  },
  optionValues: {
    flexDirection: "row",
    alignItems: "center",
  },
});
