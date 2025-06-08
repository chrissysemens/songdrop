import { View, Text, Image, StyleSheet } from "react-native";
import { Card } from "../card";
import { colours } from "../../colours";
import { Drop } from "../../types";
import { timeStampToFriendlyDate } from "../../utils/general";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Button } from "../button";
import { useState } from "react";
import { Audio } from 'expo-av';

type SelectedDropProps = {
  drop: Drop;
  onClosePress: () => void;
};

const SelectedDrop = ({ drop, onClosePress }: SelectedDropProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playPreview = async () => {
    if (isPlaying && sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      return;
    }

    if (drop.track!.previewUrl) {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: drop.track!.previewUrl },
        { shouldPlay: true }
      );
      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (!status.isLoaded) return;

        if (status.isPlaying) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      });
    }
  };

  return (
    <View style={styles.selected}>
      <Card
        height={330}
        width={340}
        borderColor={colours.text}
        style={{ backgroundColor: colours.background, flexDirection: "column" }}
      >
        <View style={styles.header}>
          <Text style={styles.close} onPress={onClosePress}>
            <AntDesign name="closecircleo" size={20} color="white" />
          </Text>
        </View>
        <View style={styles.details}>
          <View style={styles.user}>
            <Text style={styles.userName}>@chrissysemens</Text>
            <Text style={styles.date}>
              {timeStampToFriendlyDate(drop.created)}
            </Text>
          </View>
        </View>
        <View style={styles.track}>
          <View style={styles.thumbnail}>
            <Image src={drop.track!.thumbnail} height={80} width={80} />
          </View>
          <View style={styles.songInfo}>
            <Text style={styles.title}>{drop.track?.title}</Text>
            <Text style={styles.artist}>{drop.track?.artist}</Text>
            <Text style={styles.duration}>{drop.track?.duration}</Text>
          </View>
        </View>
        <View style={styles.preview}>
          <Button
            enabled={true}
            text={isPlaying ? "Stop" : "Play Preview"}
            onPress={playPreview}
            style={{ width: "auto", display: "flex", flex: 1, marginRight: 0 }}
          />
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
  header: {
    display: "flex",
    flexDirection: "row",
    color: colours.text,
  },
  close: {
    color: colours.text,
    marginLeft: "auto",
    marginBottom: 15,
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
    marginBottom: 20,
  },
  userName: {
    color: colours.text,
  },
  date: {
    marginLeft: "auto",
    color: colours.text,
    opacity: 0.7,
  },
  track: {
    display: "flex",
    flexDirection: "row",
  },
  songInfo: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: colours.text,
    fontSize: 18,
  },
  thumbnail: {
    display: "flex",
    marginRight: 20,
  },
  artist: {
    display: "flex",
    color: colours.text,
    opacity: 0.8,
  },
  duration: {
    display: "flex",
    color: colours.text,
    opacity: 0.5,
  },
  footer: {
    marginTop: 20,
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
});

export { SelectedDrop };
