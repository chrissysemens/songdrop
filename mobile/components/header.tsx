import { View, StyleSheet } from "react-native";
import { colours } from "../colours";

const Header = () => {
    return (
        <View style={styles.menu}>

        </View>
    )
};

const styles = StyleSheet.create({
    menu: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: colours.background,
    }
})

export { Header };
