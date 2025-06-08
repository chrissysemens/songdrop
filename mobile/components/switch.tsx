import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { colours } from "../colours";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

const Switch = ({ options, value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      {options.map((opt, i) => {
        const isSelected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPressIn={() => {
              onChange(opt.value);
            }}
            style={[
              styles.option,
              isSelected && styles.selected,
              i === 0 && styles.left,
              i === options.length - 1 && styles.right,
            ]}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#333",
    borderRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#333",
    alignItems: "center",
  },
  selected: {
    backgroundColor: "#555",
  },
  label: {
    color: colours.text,
    fontSize: 14,
  },
  selectedLabel: {
    fontWeight: "bold",
    color: "#fff",
  },
  left: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  right: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});

export { Switch };
