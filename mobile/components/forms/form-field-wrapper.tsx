import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const FormField = ({ children, style }: Props) => {
  return (
    <View
      style={[styles.field, style && style]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    marginVertical: 20,
  },
});

export { FormField };
