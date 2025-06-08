import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colours } from "../colours";

type Props = {
  text: string;
  enabled: boolean;
  onPress: () => void;
  className?: "primary" | "secondary" | "negative";
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Button = ({
  text,
  enabled,
  onPress,
  className = "primary",
  style,
  textStyle,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={!enabled}
      onPress={onPress}
      style={[styles.button, styles[className], style, !enabled && styles.disabled]}
    >
      <Text style={[styles.text, styles[`${className}Text`], textStyle]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 180,
    height: 60,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginRight: 20,
  },
  primary: {
    backgroundColor: colours.primary,
  },
  secondary: {
    backgroundColor: colours.accent,
  },
  negative: {
    borderColor: colours.text,
    borderWidth: 2,
  },
  disabled: {
    backgroundColor: colours.muted,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: colours.background,
  },
  secondaryText: {
    color: colours.text,
  },
  negativeText: {
    color: colours.text,
  },
});

export { Button };
