import { elements, elementStrings } from "./base";

export const selectCheckboxes = () => {
  const checked = document.querySelectorAll(
    `.${elementStrings.checkboxes}[type=checkbox]:checked`
  );
  const genreArray = [];

  checked.forEach(el => genreArray.push(el.id));
  return genreArray;
};

export const searchNoSelection = () => {
  elements.cardRow.innerHTML = `<p class="card__error">Please select at least one genre to show results.</p>`;
};

export const searchNoResults = genreArray => {
  elements.cardRow.innerHTML = `<p class="card__error">Your selection had no results. Please try another selection.</p>`;
};

export const displayGenreHeader = selectedGenres => {
  const text = selectedGenres.join(", ");
  elements.cardGenreHeader.innerHTML = text;
};
