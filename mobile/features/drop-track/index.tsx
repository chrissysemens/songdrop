import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useState } from "react";
import {
  Category,
  CollectFrom,
  Drop,
  ExpiryType,
  Genre,
  Privacy,
  Track,
} from "../../types";
import { FormTitle } from "../../components/forms/form-title";
import { FormField } from "../../components/forms/form-field-wrapper";
import { useLocation } from "../../state/location";
import { Button } from "../../components/button";
import { useInteractions } from "../../state/interactions";
import { useFirebase } from "../../hooks/useFirebase";
import { SelectTrack } from "./select-track";
import { SelectGenre } from "./select-genre";
import { TagDrop } from "./tag-drop";
import { SetAudience } from "./set-audience";
import { SetDistance } from "./set-distance";
import { SetExpiry } from "./set-expiry";
import { LocationPreview } from "./location-preview";
import { TrackPreview } from "./track-preview";
import { daysToMilliSeconds } from "../../utils/general";
import categories from "../../app/data/categories";

const DropTrack = () => {
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [expiryDays, setExpiryDays] = useState<number>(5);
  const [genreOpen, setGenreOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const { location, city } = useLocation();

  const [drop, setDrop] = useState<Drop>({
    userId: "Chrissy",
    track: null,
    privacy: "public",
    genre: "ambient",
    category: "memory",
    emoji: "🧠",
    longitude: location!.longitude,
    latitude: location!.latitude,
    collectFrom: "range",
    collectRadius: 5,
    created: Date.now(),
    expiryType: "duration",
    expiry: Date.now() + daysToMilliSeconds(5),
    collectedCount: 0,
    likeCount: 0,
  });
  const { closeSheet } = useInteractions();

  const { add } = useFirebase<Drop>({ collectionName: "tracks" });

  return (
    <View style={styles.drop}>
      <FormTitle title="Drop a track" />
      <SelectTrack
        tracks={tracks}
        setTracks={setTracks}
        selectedTrack={drop.track}
        setSelectedTrack={(track: Track | null) =>
          setDrop((prev) => ({ ...prev, track }))
        }
      />
      <SelectGenre
        genre={drop.genre}
        dropdownOpen={genreOpen}
        setGenre={(genre: Genre) => setDrop((prev) => ({ ...prev, genre }))}
        onDropdownOpen={(open: boolean) => {
          setCategoryOpen(false);
          setGenreOpen(open);
        }}
      />
      <TagDrop
        category={drop.category}
        setCategory={(category: Category) => {
          const emoji = categories.find((x) => x.value === category)!.emoji;
          setDrop((prev) => ({ ...prev, category, emoji: emoji! }));
        }}
        dropdownOpen={categoryOpen}
        onDropdownOpen={(open: boolean) => {
          setGenreOpen(false);
          setCategoryOpen(open);
        }}
      />

      <SetAudience
        privacy={drop.privacy}
        setPrivacy={(privacy: Privacy) =>
          setDrop((prev) => ({ ...prev, privacy }))
        }
      />

      <View style={styles.fieldRow}>
        <View style={styles.fieldColumn}>
          <SetDistance
            collectFrom={drop.collectFrom}
            setCollectFrom={(cf: CollectFrom) =>
              setDrop((prev) => ({ ...prev, collectFrom: cf }))
            }
            radius={drop.collectRadius}
            setRadius={(r: number) =>
              setDrop((prev) => ({ ...prev, collectRadius: r }))
            }
          />
        </View>
        <View style={styles.fieldColumn}>
          <SetExpiry
            expiryType={drop.expiryType}
            expiryDays={expiryDays}
            setExpiryType={(expiryType: ExpiryType) =>
              setDrop((prev) => ({ ...prev, expiryType }))
            }
            setExpiryDays={(expiryDays: number) => {
              setExpiryDays(expiryDays);
              setDrop((prev) => ({
                ...prev,
                expiry: Date.now() + daysToMilliSeconds(expiryDays),
              }));
            }}
          />
        </View>
      </View>
      <FormField>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.cardRow}>
            <LocationPreview location={location} city={city} />
            {drop.track && <TrackPreview selectedTrack={drop.track} />}
          </View>

          <View style={styles.buttonRow}>
            <Button
              enabled={true}
              text={"Cancel"}
              className="negative"
              style={{ marginRight: 20 }}
              onPress={() => closeSheet()}
            />
            <Button
              enabled={drop.track !== null}
              text={"Drop it"}
              onPress={async () => {
                if (drop && drop.track) {
                  await add(drop);
                  closeSheet();
                }
              }}
            />
          </View>
        </View>
      </FormField>
    </View>
  );
};

export { DropTrack };

const styles = StyleSheet.create({
  drop: {
    padding: 40,
    paddingTop: 20,
    display: "flex",
    flex: 1,
  },
  rangeDropdown: {
    display: "flex",
    flex: 3,
    flexDirection: "row",
  },
  fieldRow: {
    display: "flex",
    flexDirection: "row",
  },
  fieldColumn: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    minWidth: "50%",
    flexShrink: 0,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    minHeight: 250,
    marginBottom: 20,
  },
  buttonRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});
