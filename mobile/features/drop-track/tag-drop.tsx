import categories, { Category } from "../../app/data/categories";
import { Dropdown } from "../../components/dropdown";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";

type TagDropProps = {
  category: Category;
  dropdownOpen: boolean;
  onDropdownOpen: (open: boolean) => void;
  setCategory: (category: Category) => void;
};

const TagDrop = ({
  category,
  setCategory,
  dropdownOpen,
  onDropdownOpen,
}: TagDropProps) => {
  return (
    <FormField>
      <FormLabel text="Tag it" />
      <Dropdown
        options={categories}
        value={category}
        onChange={(c: string | number) => setCategory(c as Category)}
        open={dropdownOpen}
        onOpen={(open: boolean) => {
          onDropdownOpen(open);
        }}
      />
    </FormField>
  );
};

export { TagDrop };
