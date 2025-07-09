import { View, Image, Text, StyleSheet } from "react-native";
import { colours } from "../colours";
import logo from '../assets/logo.png';

const Header = () => {
  return (
    <View style={styles.menu}>
      <View style={styles.logo}>
        <Image source={logo} style={{height: 30, width: 30}}/>
      </View>
      <View style={styles.badge}>
        <Text style={styles.initials}>CS</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    height: 50,
    display: "flex",
    flexDirection: "row",
    backgroundColor: colours.background,
    borderBottomWidth: 1,
    borderBottomColor: colours.surface
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 12,
  },
  badge: {
    height: 35,
    width: 35,
    borderRadius: 50,
    backgroundColor: colours.background,
    borderColor: colours.text,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 'auto',
    marginLeft: 'auto',
    marginRight: 20,
  },
  initials: {
    textAlign: "center",
    color: colours.text,
    fontSize: 12,
    fontWeight: "500",
  },
});

export { Header };
