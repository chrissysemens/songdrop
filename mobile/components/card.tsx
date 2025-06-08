import { View, StyleSheet, ColorValue, StyleProp, ViewStyle } from "react-native"

type Props = {
    height: number;
    width: number;
    children: React.ReactNode;
    borderColor: ColorValue;
    style?: StyleProp<ViewStyle>;
}

export const Card = ({height, width, children, borderColor, style }: Props) => {
    return (<View style={[styles.card, {height, width, borderColor}, style]}>{children}</View>)
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 15,
    }
})