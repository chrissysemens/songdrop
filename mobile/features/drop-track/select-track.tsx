import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import { Keyboard, TextInput, View, StyleSheet } from "react-native";
import { Track } from "../../types";
import useAuthState from "../../state/spotify-auth";
import { useFetch } from "../../hooks/useFetch";
import { debounce, millisecondsToMinutesAndSeconds } from "../../utils/general";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import { TrackResult } from "../../components/tracks/search-result";
import { Input } from "../../components/input";
import { FontAwesome } from "@expo/vector-icons";
import { TrackResults } from "../../components/tracks/search-results";

type TrackProps = {
  selectedTrack: Track | null;
  setSelectedTrack: (selectedTrack: Track | null) => void;
  tracks: Array<Track>;
  setTracks: (tracks: Array<Track>) => void;
};

const SelectTrack = forwardRef<TextInput, TrackProps>(
  (
    { tracks, selectedTrack, setSelectedTrack, setTracks }: TrackProps,
    ref: React.ForwardedRef<TextInput>
  ) => {
    const [searchText, setSearchText] = useState<string>("");
    const [searchUrl, setSearchUrl] = useState<string>("");
    const { token } = useAuthState();

    useFetch(searchUrl, token ?? "", (results: any) => {
      const tracks: Array<Track> = results.tracks?.items.map((item: any) => ({
        id: item.id,
        title: item.name,
        artist: item.artists.map((a: any) => a.name).join(", "),
        thumbnail: item.album.images[2]?.url,
        duration: millisecondsToMinutesAndSeconds(item.duration_ms),
        previewUrl: item.preview_url,
      }));
      setTracks(tracks);
    });

    const searchSong = useCallback((text: string) => {
      Keyboard.dismiss();
      if (text.length > 3) {
        setSearchUrl(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(
            text
          )}&type=track&limit=10`
        );
      }
    }, []);

    const debouncedSearch = useMemo(
      () => debounce(searchSong, 1300),
      [searchSong]
    );

    const handleSearch = useCallback(
      (text: string) => {
        setSearchText(text);
        debouncedSearch(text);
        if (!text.length) setTracks([]);
      },
      [debouncedSearch]
    );

    const selectTrack = useCallback((track: Track | null) => {
      setSearchText("");
      setTracks([]);
      setSelectedTrack(track);
    }, []);

    return (
      <FormField style={styles.song}>
        <>
          <FormLabel text="Track" />
          {selectedTrack ? (
            <TrackResult
              key={"selected-song"}
              track={selectedTrack}
              onRemove={() => selectTrack(null)}
            />
          ) : (
            <Input
              id="song"
              icon={<FontAwesome name="search" size={16} color="#888" />}
              ref={ref}
              placeholder="Search spotify songs"
              value={searchText}
              onChange={handleSearch}
            />
          )}
          {tracks.length > 0 && (
            <View
              style={[
                styles.results,
                { height: tracks.length > 0 ? "auto" : 0 },
              ]}
            >
              <TrackResults tracks={tracks} onSelect={selectTrack} />
            </View>
          )}
        </>
      </FormField>
    );
  }
);

const styles = StyleSheet.create({
  song: {
    position: "relative",
  },
  results: {
    position: "absolute",
    top: 60,
    width: "100%",
    zIndex: 10,
  },
});

export { SelectTrack };
