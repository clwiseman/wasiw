import { elements } from "./base";

//Title currently set to 43 characters, synopsis to 430
export const limitStringLength = (title, limit = 43) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(" ").reduce((acc, cur) => {
      if (acc + cur.length <= limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(" ")}...`;
  }
  return title;
};

export const clearCards = () => {
  elements.cardRow.innerHTML = "";
};

const cardHTML = cardObj => {
  const markup = `<div class="card">
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
                    ${cardObj.genres.join(", ")}
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
            ${limitStringLength(cardObj.synopsis, 430)}
        </div>
        <div class="card__btn">
            <a href="#" class="btn btn-small" data-id="${
              cardObj.id
            }">No, Thanks!<br>Try Again!</a>
        </div>
    </div>`;
  return markup;
};

export const populateCard = cardObj => {
  const markup = `
    <div class="col-1-of-3">
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
