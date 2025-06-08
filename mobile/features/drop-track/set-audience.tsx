import { Switch } from '../../components/switch';
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import { Privacy } from "../../types";

type SetAudienceProps = {
  privacy: Privacy;
  setPrivacy: (privacy: Privacy) => void;
};

const SetAudience = ({ privacy, setPrivacy }: SetAudienceProps) => {
  return (
    <FormField>
      <FormLabel text="Audience" />
      <Switch
        options={[
          { label: "Public", value: "public" },
          { label: "Private", value: "private" },
        ]}
        value={privacy}
        onChange={(value: string) => setPrivacy(value as Privacy)}
      />
    </FormField>
  );
};

export { SetAudience }