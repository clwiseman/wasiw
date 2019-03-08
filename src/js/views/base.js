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

export const scrollToTop = element => {
  element.scrollIntoView({
    behaviour: "smooth",
    block: "start"
  });
};

export const renderLoader = parent => {
  const loader = `<div class="loader">
                    <i class="fas fa-spinner"></i>
                  </div>`;

  parent.insertAdjacentHTML("afterbegin", loader);
};

export const clearLoader = parent => {
  parent.innerHTML = "";
};
