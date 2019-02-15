export const elements = {
  genreSection: document.querySelector(".section-form"),
  genreForm: document.querySelector(".form__columns"),
  tellMeButton: document.querySelector(".tellMe"),
  cardSection: document.querySelector(".section-cards"),
  cardGenreHeader: document.querySelector(".section-cards__heading-genres"),
  cardRow: document.querySelector(".card__row")
};

export const elementStrings = {
  checkboxes: "form__checkbox-input",
  cardClose: "card__close"
};

export const showSection = section => {
  if (section.classList.contains("hide")) {
    section.classList.remove("hide");
  }
};

export const scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
