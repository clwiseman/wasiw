import { elements, elementStrings } from "./base";

export const populateCheckboxes = genre => {
  const markup = `<div class="form__group">
        <input name="${genre}" type="checkbox" class="form__checkbox-input" id="${genre}">
        <label for="${genre}" class="form__checkbox-label form__checkbox-font">
        <span class="form__checkbox-button"></span>${genre}<br></label>
    </div>`;
  elements.genreForm.insertAdjacentHTML("beforeend", markup);
};

export const clearAllCheckboxes = () => {
  document
    .querySelectorAll(`.${elementStrings.checkboxes}`)
    .forEach(checkbox => {
      checkbox.checked = false;
    });
};
