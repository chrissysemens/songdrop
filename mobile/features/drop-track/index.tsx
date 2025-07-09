import React, { useState } from "react";
import { View, StyleSheet, Text, FlatList, ListRenderItem } from "react-native";
import { Drop, Track } from "../../types";
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
import { useGlobalState } from "../../state/global-state";
import { NotesAndPrize } from "./notes-and-prize";

const DropTrack = () => {
  const [tracks, setTracks] = useState<Array<Track>>([]);
  const [expiryDays, setExpiryDays] = useState<number>(5);
  const [genreOpen, setGenreOpen] = useState<boolean>(false);
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const { location, city } = useLocation();
  const { closeSheet, setSheetContent } = useInteractions();
  const { drop, setDrop } = useGlobalState();

  const renderEmpty: ListRenderItem<any> = () => null;

  return (
    <FlatList
      data={[]}
      renderItem={renderEmpty}
      keyExtractor={(_, index) => index.toString()}
      keyboardShouldPersistTaps="handled"
      ListHeaderComponent={
        <View style={styles.content}>
          <FormTitle title="Drop a track" />
          <SelectTrack
            tracks={tracks}
            setTracks={setTracks}
            selectedTrack={drop.track}
            setSelectedTrack={(track) =>
              setDrop({
                ...drop,
                track,
                latitude: location?.latitude ?? 0,
                longitude: location?.longitude ?? 0,
              })
            }
          />
          <SelectGenre
            genre={drop.genre}
            dropdownOpen={genreOpen}
            setGenre={(genre) => setDrop({ ...drop, genre })}
            onDropdownOpen={(open) => {
              setCategoryOpen(false);
              setGenreOpen(open);
            }}
          />
          <TagDrop
            category={drop.category}
            setCategory={(category) => {
              const emoji = categories.find((x) => x.value === category)!.emoji;
              setDrop({ ...drop, emoji });
            }}
            dropdownOpen={categoryOpen}
            onDropdownOpen={(open) => {
              setGenreOpen(false);
              setCategoryOpen(open);
            }}
          />
          <SetAudience
            privacy={drop.privacy}
            setPrivacy={(privacy) => setDrop({ ...drop, privacy })}
          />
          <SetDistance
            collectFrom={drop.collectFrom}
            setCollectFrom={(cf) => setDrop({ ...drop, collectFrom: cf })}
            radius={drop.collectRadius}
            setRadius={(r) => setDrop({ ...drop, collectRadius: r })}
          />
          <SetExpiry
            expiryType={drop.expiryType}
            expiryDays={expiryDays}
            setExpiryType={(expiryType) => setDrop({ ...drop, expiryType })}
            setExpiryDays={(days) => {
              setExpiryDays(days);
              setDrop({ ...drop, expiry: daysToMilliSeconds(days) });
            }}
          />
          <FormField>
            <View>
              <View style={styles.cardRow}>
                <LocationPreview location={location} city={city} />
                {drop.track && <TrackPreview selectedTrack={drop.track} />}
              </View>
              <View style={styles.buttonRow}>
                <Button
                  enabled
                  text="Cancel"
                  className="negative"
                  style={{ marginRight: 20 }}
                  onPress={() => closeSheet()}
                />
                <Button
                  enabled={drop.track !== null}
                  text="Next"
                  onPress={async () => {
                    setSheetContent(<NotesAndPrize />);
                  }}
                />
              </View>
            </View>
          </FormField>
        </View>
      }
    />
  );
};

export { DropTrack };

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 450,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    minHeight: 250,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
