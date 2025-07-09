import React, { forwardRef } from "react";
import { TextInput, View, ViewStyle, StyleSheet, TextInputProps } from "react-native";

type TextAreaProps = {
  id: string;
  icon?: React.ReactElement<any>;
  onChange: (text: string) => void;
  value: string;
  placeholder: string;
  style?: ViewStyle;
  minHeight?: number;
} & Omit<TextInputProps, "onChange">;

const TextArea = forwardRef<TextInput, TextAreaProps>(
  ({ id, icon, onChange, value, placeholder, style, minHeight = 80, ...rest }, ref) => {
    return (
      <View style={[styles.inputWrapper, { minHeight }, style]}>
        {icon &&
          React.cloneElement(icon as React.ReactElement<any>, {
            style: [icon.props?.style, styles.icon],
          })}
        <TextInput
          id={id}
          ref={ref}
          placeholder={placeholder}
          placeholderTextColor="#888"
          value={value}
          onChangeText={onChange}
          style={[styles.input, { minHeight }]}
          multiline
          textAlignVertical="top"
          {...rest}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  icon: {
    marginTop: 8,
    marginRight: 8,
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
});

export { TextArea };
