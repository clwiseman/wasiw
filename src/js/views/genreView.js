import { elements, elementStrings } from "./base";

export const populateCheckboxes = genre => {
  /*
  const markup = `
    <div class="form__group">
        <label for="${genre}" class="form__checkbox-label form__checkbox-font">
        <input name="${genre}" type="checkbox" class="form__checkbox-input" id="${genre}">
        <span class="form__checkbox-button"></span>${genre}<br></label>
    </div>`;
    */

  const markup = `
    <div class="form__group">
        <label for="${genre}" class="form__checkbox-label form__checkbox-font">
          <i class="far fa-square form__checkbox-custom" id="${genre}-check"></i>
          <i class="far fa-check-square form__checkbox-custom--checked hide" id="${genre}-check-filled"></i>
          <input name="${genre}" type="checkbox" class="form__checkbox-input" id="${genre}">${genre}<br>
        </label>
    </div>`;
  elements.genreForm.insertAdjacentHTML("beforeend", markup);
};

export const clearAllCheckboxes = () => {
  //Set checkbox inputs to not checked
  const checkboxes = document.querySelectorAll(`.${elementStrings.checkboxes}`);
  checkboxes.forEach(checkbox => (checkbox.checked = false));

  //Show "unchecked" image
  const checkboxesEmpty = document.querySelectorAll(
    `.${elementStrings.checkboxesEmpty}`
  );
  checkboxesEmpty.forEach(checkbox => {
    if (checkbox.classList.contains("hide")) {
      checkbox.classList.remove("hide");
    }
  });

  //Hide "checked" image
  const checkboxesFilled = document.querySelectorAll(
    `.${elementStrings.checkboxesFilled}`
  );
  checkboxesFilled.forEach(checkbox => {
    if (!checkbox.classList.contains("hide")) {
      checkbox.classList.add("hide");
    }
  });
};

export const genreFormError = () => {
  elements.genreSection.innerHTML = `<p class="form__error">There was a problem connecting to our data source. Please try again later.</p>`;
};

export const checkCheckbox = input => {
  const genre = input.id;
  const emptyCheck = document.getElementById(`${genre}-check`);
  const filledCheck = document.getElementById(`${genre}-check-filled`);

  if (input.checked) {
    emptyCheck.classList.add("hide");
    filledCheck.classList.remove("hide");
  } else {
    emptyCheck.classList.remove("hide");
    filledCheck.classList.add("hide");
  }
};
