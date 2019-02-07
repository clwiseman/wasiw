import Genres from "./models/Genres";
import Search from "./models/Search";
import Cards from "./models/Cards";
import * as genreView from "./views/genreView";
import * as searchView from "./views/searchView";
import * as cardsView from "./views/cardsView";
import {
  elements,
  elementStrings,
  sendRequest,
  showSection,
  scrollToBottom
} from "./views/base";

/** Global state of the app
 * - Generate list of genres
 * - Search selected genre
 * - Populate anime cards
 * - Reroll new selection
 */

const state = {};
window.l = state;

/**
 GENRE LIST CONTROLLER
*/

const controlGenreList = async () => {
  try {
    state.genres = new Genres();

    // 1) Send API request
    state.genres.addGenres(await sendRequest(state.genres.query));

    // 2) Generate radio buttons
    state.genres.list.forEach(genre => genreView.populateCheckboxes(genre));
  } catch (error) {
    console.warn(error.message);
  }
};

/**
 SEARCH RESULTS CONTROLLER
 */

const controlSearchList = async () => {
  try {
    state.anime = new Search();

    //Filter API request to radio button selection
    const selectedGenres = searchView.selectCheckboxes();

    state.anime.setQuery(selectedGenres);

    //Send request and store anime data
    state.anime.list = state.anime.getAnime(
      await sendRequest(state.anime.query)
    );
  } catch (error) {
    console.warn(error.message);
  }
};

/**
 CARDS CONTROLLER
*/

const controlGenerateCards = (numCards = 1) => {
  for (var i = 1; i <= numCards; i++) {
    //Select random anime from search list
    if (!state.cards) state.cards = new Cards();
    const randomAnime = state.cards.selectRandom(state.anime.list);

    //Move to cards data
    state.cards.getCardData(randomAnime);

    //Remove from anime search list
    state.anime.removeAnime(randomAnime.id);

    //Populate data on card
    cardsView.populateCard(randomAnime);
  }
};

/* ******* EVENTS ******* */

//RUNS ON PAGE LOAD

window.addEventListener("load", () => {
  //Generate genre checkboxes on page load
  controlGenreList();
});

//RUNS ON "Tell Me What to Watch" BUTTON

elements.tellMeButton.addEventListener("click", async e => {
  //Stop from submitting href=#
  e.preventDefault();

  // 1) Request to API, filter results on radio button selection
  await controlSearchList();

  // 2) Card section appears
  showSection(elements.cardSection);

  // 3) Select 3 random entries and fill cards, reset if already cards
  if (state.cards) {
    state.cards.list = [];
    cardsView.clearCards();
  }
  controlGenerateCards(3);

  // 4) Window scrolls down to bottom
  scrollToBottom();

  // 5) Clear checkboxes
  genreView.clearAllCheckboxes();
});

//RUNS ON "Try Again" BUTTONS

elements.cardRow.addEventListener("click", e => {
  //Stop from submitting href=#
  e.preventDefault();

  //Event delegation to btn on card
  const btn = e.target.closest(`.${elementStrings.tryAgainBtn}`);

  if (btn) {
    const id = parseInt(btn.dataset.id, 10);
    const randomAnime = state.cards.selectRandom(state.anime.list);

    //Delete current card data
    state.cards.deleteCard(id);

    //Set new card data
    state.cards.getCardData(randomAnime);

    //Remove from anime search list
    state.anime.removeAnime(randomAnime.id);

    //Replace card view with new anime
    const newCardObj = state.cards.list.filter((state.cards.list.id = id));
    console.log(newCardObj);
    cardsView.replaceCard(btn, newCardObj);
  }
});
