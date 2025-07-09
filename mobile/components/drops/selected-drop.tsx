import { View, Text, Image, StyleSheet, Linking } from "react-native";
import { Card } from "../card";
import { colours } from "../../colours";
import { Drop } from "../../types";
import { timeStampToFriendlyDate } from "../../utils/general";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import WebView from "react-native-webview";

type SelectedDropProps = {
  drop: Drop | null;
  onClosePress: () => void;
};

const SelectedDrop = ({ drop, onClosePress }: SelectedDropProps) => {
  const isVisible = !!drop;
  const spotifyEmbedUrl = isVisible
    ? `https://open.spotify.com/embed/track/${drop.track?.id}`
    : "";
  return (
    <View style={styles.selected}>
      <Card
        height={300}
        width={340}
        borderColor={colours.text}
        style={[styles.card, {
          display: !isVisible ? "none" : "flex",
        }]}
      >
        {drop && (
          <View style={styles.details}>
            <View style={styles.user}>
              <Text style={styles.userName}>@chrissysemens</Text>
              <Text style={styles.date}>
                {timeStampToFriendlyDate(drop.created)}
              </Text>
              <Text style={styles.close} onPress={onClosePress}>
                <AntDesign name="closecircleo" size={20} color="white" />
              </Text>
            </View>
          </View>
        )}
        <View style={styles.preview}>
          <View style={styles.webViewContainer}>
            <WebView
              source={{ uri: spotifyEmbedUrl }}
              style={styles.webView}
              allowsInlineMediaPlayback={true}
              mediaPlaybackRequiresUserAction={false}
              androidLayerType="hardware"
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.notes}>
            <MaterialIcons name="speaker-notes" size={24} color="white" />
            <Text style={styles.notesText}>Notes</Text>
          </View>
          <View style={styles.profile}>
            <FontAwesome name="user" size={23} color="white" />
            <Text style={styles.profileText}>User</Text>
          </View>
          <View style={styles.like}>
            <AntDesign name="like1" size={24} color="white" />
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colours.background,
    flexDirection: "column",
    zIndex: 1000,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    color: colours.text,
  },
  close: {
    color: colours.text,
    marginLeft: "auto",
    marginRight: 10,
  },
  details: {
    display: "flex",
    flexDirection: "row",
    color: colours.text,
  },
  user: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  userName: {
    color: colours.text,
  },
  date: {
    marginLeft: "auto",
    color: colours.text,
    opacity: 0.7,
  },
  footer: {
    display: "flex",
    flexDirection: "row",
  },
  notes: {
    display: "flex",
    flexDirection: "row",
    marginRight: 30,
  },
  notesText: {
    color: colours.text,
    marginLeft: 8,
  },
  profile: {
    display: "flex",
    flexDirection: "row",
  },
  profileText: {
    color: colours.text,
    marginLeft: 9,
  },
  like: {
    marginLeft: "auto",
  },
  selected: {
    position: "absolute",
    zIndex: 1000,
    top: 40,
    right: 10,
  },
  preview: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
  },
  webViewContainer: {
    height: 200,
    width: "100%",
  },
  webView: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export { SelectedDrop };
