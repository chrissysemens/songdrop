import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "../../components/dropdown";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import { Input } from "../../components/input";
import { ExpiryType } from "../../types";
import { colours } from "../../colours";

type SetExpiryProps = {
  expiryType: ExpiryType;
  expiryDays: number;
  setExpiryType: (expiryType: ExpiryType) => void;
  setExpiryDays: (expiryDays: number) => void;
};

const SetExpiry = ({
  expiryType,
  setExpiryType,
  expiryDays,
  setExpiryDays,
}: SetExpiryProps) => {
  const [dropdownOpen, setDropDownOpen] = useState<boolean>(false);

  return (
    <FormField>
      <FormLabel text="Expires" />
      <View style={styles.blockContainer}>
        <>
          <Dropdown
            onChange={(type: string | number) =>
              setExpiryType(type as ExpiryType)
            }
            value={expiryType as string}
            options={[
              { label: "Never", value: "never" },
              { label: "After duration", value: "duration" },
            ]}
            open={dropdownOpen}
            onOpen={(open: boolean) => setDropDownOpen(open)}
          />
          {expiryType !== "never" && (
            <>
              <Input
                id="expiry"
                placeholder="5"
                value={expiryDays ? expiryDays.toString() : ""}
                onChange={(value: string) => setExpiryDays(parseInt(value))}
                style={styles.blockInput}
              />
              <Text style={styles.blockLabel}>days</Text>
            </>
          )}
        </>
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

export { SetExpiry };