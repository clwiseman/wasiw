import axios from "axios";

export const elements = {
  genreForm: document.querySelector(".form__columns"),
  tellMeButton: document.querySelector(".tellMe"),
  cardSection: document.querySelector(".section-cards"),
  cardRow: document.querySelector(".card__row")
};

export const elementStrings = {
  checkboxes: "form__checkbox-input",
  tryAgainBtn: "btn-small"
};

export const sendRequest = async query => {
  const base_url = "https://graphql.anilist.co";

  const configRequest = {
    url: base_url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: {
      query: query
    }
  };

  try {
    const result = await axios.post(
      configRequest.url,
      configRequest.body,
      configRequest.headers
    );
    const data = await result.data.data;
    return data;
  } catch (error) {
    console.warn(error.message);
  }
};

export const showSection = section => {
  if (section.classList.contains("hide")) {
    section.classList.remove("hide");
  }
};

export const scrollToBottom = () => {
  window.scrollTo(0, document.body.scrollHeight);
};
