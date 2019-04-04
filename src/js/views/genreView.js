import { elements, elementStrings } from "./base";

export const populateCheckboxes = genre => {
  //NOTE the id on the icon is set with an _ and not a - because one of the genres is Sci-fi, so using a - caused it to be unusable with a .split later
  const markup = `
    <div class="form__group">
      <i class="far ${
        elementStrings.iconEmpty
      } form__checkbox-icon" id="${genre}_icon"></i>
      <input name="${genre}" type="checkbox" class="form__checkbox-input" id="${genre}">
      <label for="${genre}" class="form__checkbox-label form__checkbox-font">${genre}</label>
    </div>
  `;

  elements.genreForm.insertAdjacentHTML("beforeend", markup);
};

export const clearAllCheckboxes = () => {
  //Set checkbox inputs to not checked
  const checkboxes = document.querySelectorAll(`.${elementStrings.checkboxes}`);
  checkboxes.forEach(checkbox => (checkbox.checked = false));

  //Show "unchecked" image
  const checkboxIcons = document.querySelectorAll(
    `.${elementStrings.checkboxIcon}`
  );

  checkboxIcons.forEach(icon => {
    if (icon.classList.contains(elementStrings.iconChecked)) {
      icon.classList.remove(elementStrings.iconChecked);
      icon.classList.add(elementStrings.iconEmpty);
    }
  });
};

export const genreFormError = () => {
  elements.genreSection.innerHTML = `<p class="form__error">There was a problem connecting to our data source. Please try again later.</p>`;
};

export const checkCheckbox = (input, genre) => {
  const icon = document.getElementById(`${genre}_icon`);

  if (input.checked) {
    if (icon.classList.contains(elementStrings.iconEmpty)) {
      icon.classList.remove(elementStrings.iconEmpty);
      icon.classList.add(elementStrings.iconChecked);
      return;
    }
  } else {
    if (icon.classList.contains(elementStrings.iconChecked)) {
      icon.classList.remove(elementStrings.iconChecked);
      icon.classList.add(elementStrings.iconEmpty);
      return;
    }
  }
};

export const toggleCheck = input => {
  if (input.checked) {
    input.checked = false;
  } else {
    input.checked = true;
  }
};

export const checkboxAddFocus = input => {
  const genre = input.id;
  const icon = document.getElementById(`${genre}_icon`);

  if (!icon.classList.contains("form__checkbox-focus")) {
    icon.classList.add("form__checkbox-focus");
  }
};

export const checkboxRemoveFocus = input => {
  const genre = input.id;
  const icon = document.getElementById(`${genre}_icon`);

  if (icon.classList.contains("form__checkbox-focus")) {
    icon.classList.remove("form__checkbox-focus");
  }
};
