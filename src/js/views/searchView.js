import { elements, elementStrings } from "./base";

export const selectCheckboxes = () => {
  const checked = document.querySelectorAll(
    `.${elementStrings.checkboxes}[type=checkbox]:checked`
  );
  const genreArray = [];

  checked.forEach(el => genreArray.push(el.id));
  return genreArray;
};

export const searchRequestError = () => {
  const message = `<p class="form__error">We are currently unable to connect to our data source. Please try again later.</p>`;
  elements.cardSection.innerHTML = message;
};
