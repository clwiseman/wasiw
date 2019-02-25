import { elements } from "./base";

//Title currently set to default 36 characters, genres set to 41
export const limitStringLength = (title, limit = 36, ending = "...") => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}${ending}`;
  }
  return title;
};

export const clearCards = () => {
  elements.cardRow.innerHTML = "";
};

const cardHTML = cardObj => {
  const markup = `<div class="card">
        <i class="fas fa-window-close btn-close card__close" data-id="${
          cardObj.id
        }"></i>
        <img class="card__img" src="${cardObj.image}" />
        <div class="card__heading">
            <h4 class="card__heading-span">${limitStringLength(
              cardObj.titleEnglish === null
                ? cardObj.titleRomaji
                : cardObj.titleEnglish
            )}</h4>
        </div>
        <div class="card__details">
            <ul>
                <li>
                    <span class="card__sub-heading">Genres</span><br />
                    ${limitStringLength(cardObj.genres.join(", "), 41, " +")}
                </li>
                <li><span class="card__sub-heading">Score</span> ${
                  cardObj.score === null ? "-" : cardObj.score + " %"
                }</li>
                <li>
                    <span class="card__sub-heading">Season</span><br />
                        ${
                          cardObj.season.includes("null")
                            ? cardObj.season.substring(
                                cardObj.season.length - 4
                              )
                            : cardObj.season
                        }
                </li>
            </ul>
        </div>
        <div class="card__synopsis">
            <div class="card__sub-heading">Synopsis</div>
            ${cardObj.synopsis}
        </div>
        <div class="card__link">More info on <a class="card__link-href" href="${
          cardObj.url
        }" target="_blank">Anilist &rarr;</a></div>
    </div>`;
  return markup;
};

export const populateCard = cardObj => {
  const markup = `
    <div class="col-1-of-3 card__column">
        ${cardHTML(cardObj)}
    </div>`;
  elements.cardRow.insertAdjacentHTML("beforeend", markup);
};

export const replaceCard = (btn, cardObj) => {
  const cardView = btn.parentNode.parentNode;

  //Clear current card view
  cardView.innerHTML = "";

  //Set new view
  cardView.innerHTML = cardHTML(cardObj);
};

export const deleteCardView = btn => {
  const cardColumn = btn.parentNode.parentNode;

  //Clear current card view
  cardColumn.innerHTML = "";
};

export const noCardsLeft = () => {
  elements.cardRow.innerHTML = `<p class="card__error">There are no more options for this category. Please try a new search.</p>`;
};

export const hideCardSection = () => {
  if (!elements.cardSection.classList.contains("hide")) {
    elements.cardSection.classList.add("hide");
  }
};
