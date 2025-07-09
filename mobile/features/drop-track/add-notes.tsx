import { Switch } from "../../components/switch";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import { Privacy } from "../../types";
import { TextArea } from "../../components/text-area";

type AddNotesProps = {
  notes: string;
  setNotes: (notes: string) => void;
};

const AddNotes = ({ notes, setNotes }: AddNotesProps) => {
  return (
    <FormField>
      <FormLabel text="Notes" />
      <TextArea
        id={"notes"}
        onChange={setNotes}
        value={notes}
        placeholder={`Let people know why you've left this track here to be found`}
      />
    </FormField>
  );
};

export { AddNotes };
