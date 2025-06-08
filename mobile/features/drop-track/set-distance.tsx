import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "../../components/dropdown";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import { Input } from "../../components/input";
import { CollectFrom } from "../../types";
import { colours } from "../../colours";

type DistanceProps = {
  collectFrom: CollectFrom;
  setCollectFrom: (collectFrom: CollectFrom) => void;
  radius: number;
  setRadius: (radius: number) => void;
};

const SetDistance = ({
  collectFrom,
  setCollectFrom,
  radius,
  setRadius,
}: DistanceProps) => {
  const [dropdownOpen, setDropDownOpen] = useState<boolean>(false);
  return (
    <FormField>
      <FormLabel text="Collectable from" />
      <View style={styles.blockContainer}>
        <Dropdown
          onChange={(from: string | number) =>
            setCollectFrom(from as CollectFrom)
          }
          value={collectFrom as string}
          options={[
            { label: "Anywhere", value: "anywhere" },
            { label: "Range", value: "range" },
          ]}
          style={styles.blockDropdown}
          open={dropdownOpen}
          onOpen={setDropDownOpen}
        />
        {collectFrom === "range" && (
          <>
            <Input
              id="range"
              placeholder="1"
              value={radius ? radius.toString() : ""}
              onChange={(value: string) => setRadius(parseInt(value))}
              style={styles.blockInput}
            />
            <Text style={styles.blockLabel}>Km</Text>
          </>
        )}
      </View>
    </FormField>
  );
};

const styles = StyleSheet.create({
  blockContainer: {
    flexDirection: "row",
    borderRadius: 6,
  },
  blockDropdown: {
    flex: 1,
    maxWidth: 250,
  },
  blockInput: {
    flex: 1,
    maxWidth: 80,
    marginLeft: 20,
    marginRight: 10,
    textAlign: "center",
    alignSelf: "flex-start",
  },
  blockLabel: {
    color: colours.text,
    display: "flex",
    flex: 1,
    marginTop: "auto",
    marginBottom: 5,
    fontSize: 12,
  },
});

export { SetDistance };
