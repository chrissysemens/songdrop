import { StyleSheet, Text } from "react-native"
import { colours } from "../../colours"

type Props = {
    title: string;
}

const FormTitle = ({ title}: Props) => {
    return (
        <Text style={styles.title}>
            {title}
        </Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        color: colours.primary,
        marginBottom: 20,
    }
})

export { FormTitle }