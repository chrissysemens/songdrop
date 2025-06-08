import { StyleSheet, Text } from "react-native"
import { colours } from "../../colours"

type Props = {
    text: string;
}

const FormLabel = ({ text }: Props) => {
    return (
        <Text style={styles.title}>
            {text}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        color: colours.muted,
        marginBottom: 10,
    }
})

export { FormLabel }