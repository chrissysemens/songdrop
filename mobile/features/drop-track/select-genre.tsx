import { Genre } from "../../types";
import { Dropdown } from "../../components/dropdown";
import { FormField } from "../../components/forms/form-field-wrapper";
import { FormLabel } from "../../components/forms/form-label";
import genres from "../../app/data/genres";

type SelectGenreProps = {
  genre: Genre;
  dropdownOpen: boolean;
  onDropdownOpen: (open: boolean) => void;
  setGenre: (genre: Genre) => void;
};

const SelectGenre = ({
  genre,
  setGenre,
  dropdownOpen,
  onDropdownOpen,
}: SelectGenreProps) => {
  return (
    <FormField>
      <FormLabel text="Genre" />
      <Dropdown
        options={genres}
        value={genre}
        onChange={(g: string | number) => setGenre(g as Genre)}
        open={dropdownOpen}
        onOpen={(open: boolean) => {
          onDropdownOpen(open);
        }}
      />
    </FormField>
  );
};

export { SelectGenre };