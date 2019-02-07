import { elements, elementStrings } from "./base";

export const selectCheckboxes = () => {
  const checked = document.querySelectorAll(
    `.${elementStrings.checkboxes}[type=checkbox]:checked`
  );
  const genreArray = [];

  checked.forEach(el => genreArray.push(el.id));
  return genreArray;
};
