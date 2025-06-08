import React, { forwardRef } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type InputProps = {
  id: string;
  icon?: React.ReactElement<any>;
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  style?: ViewStyle;
};

const Input =  forwardRef<TextInput, InputProps>(({ id, icon, onChange, value, placeholder, style }: InputProps, ref) => {
  return (
    <View style={[styles.inputWrapper, style]}>
      {icon && React.cloneElement(icon as React.ReactElement<any>, {
        style: [icon.props?.style, styles.icon],
      })}
      <TextInput
        id={id}
        ref={ref}
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  icon: {
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
  },
});

export { Input };
