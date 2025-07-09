import { View, StyleSheet } from "react-native";
import { useGlobalState } from "../../state/global-state";
import { AddNotes } from "./add-notes";
import { FormTitle } from "../../components/forms/form-title";
import { useInteractions } from "../../state/interactions";
import { Button } from "../../components/button";
import { useFirebase } from "../../hooks/useFirebase";
import { Drop } from "../../types";

const NotesAndPrize = () => {
  const { closeSheet } = useInteractions();
  const { drop, setDrop } = useGlobalState();
  const { add } = useFirebase<Drop>({ collectionName: "tracks" });

  return (
    <View style={styles.content}>
      <FormTitle title="Drop a track" />
      <AddNotes
        notes={drop.notes}
        setNotes={(notes: string) => setDrop({ ...drop, notes })}
      />
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
            if (drop && drop.track) {
              await add(drop);
              closeSheet();
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 450,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export { NotesAndPrize };
