import Genres from "./models/Genres";
import Search from "./models/Search";
import Cards from "./models/Cards";
import * as genreView from "./views/genreView";
import * as searchView from "./views/searchView";
import * as cardsView from "./views/cardsView";
import {
  elements,
  elementStrings,
  showSection,
  scrollToTop,
  renderLoader,
  clearLoader
} from "./views/base";
import axios from "axios";

/** Global state of the app
 * genres: list of genres
 * anime: search results for selected genre
 * cards: populate anime details on cards
 */

const state = {};

/******************* TESTING - REMOVE BEFORE LIVE **********************/
window.l = state;

/**
 API REQUEST FUNCTION
 */

const sendRequest = async query => {
  const base_url = "https://graphql.anilist.co";

  const configRequest = {
    url: base_url,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: {
      query
    }
  };

  const result = await axios.post(
    configRequest.url,
    configRequest.body,
    configRequest.headers
  );

  const data = await result;

  return data;
};

/**
 GENRE LIST CONTROLLER
*/

const controlGenreList = async () => {
  state.genres = new Genres();

  // 1) Send API request
  state.genres.addGenres(await sendRequest(state.genres.query));

  // 2) Generate radio buttons
  state.genres.list.forEach(genre => genreView.populateCheckboxes(genre));
};

/**
 SEARCH RESULTS CONTROLLER
 */

const controlSearchList = async genresArray => {
  state.anime = new Search();

  //Add selected genres to query
  state.anime.setQuery(genresArray, 1);

  //Send request and store anime data
  let searchObj = state.anime.getAnime(await sendRequest(state.anime.query));
  state.anime.list = searchObj.animeArray;

  //Check pagination
  if (searchObj.hasNextPage === true) {
    //Loop through total number of pages
    for (var page = 2; page <= searchObj.lastPage; page++) {
      //Reset query for current page
      state.anime.setQuery(genresArray, page);

      //Rerun request with new query
      searchObj = state.anime.getAnime(await sendRequest(state.anime.query));

      //Add new anime to anime list
      searchObj.animeArray.forEach(anime => {
        state.anime.list.push(anime);
      });
    }
  }
};

/**
 CARDS CONTROLLER
*/

const controlGenerateCard = (numCards = 1) => {
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

const controlReplaceCard = (id, btn) => {
  //Delete current card data
  state.cards.deleteCard(id);

  //Set new card data
  const randomAnime = state.cards.selectRandom(state.anime.list);
  state.cards.getCardData(randomAnime);

  //Remove from anime search list
  state.anime.removeAnime(randomAnime.id);

  //Replace card view with new anime
  cardsView.replaceCard(btn, randomAnime);
};

/* ******* EVENTS ******* */

/**
RUNS ON PAGE LOAD
*/

window.addEventListener("load", async () => {
  try {
    //Generate genre checkboxes on page load
    await controlGenreList();
  } catch {
    //Generate error message to user interface
    genreView.genreFormError();

    //Hide card section
    cardsView.hideCardSection();
  }
});

/**
RUNS ON "Tell Me What to Watch" BUTTON
*/

elements.tellMeButton.addEventListener("click", async e => {
  //Stop from submitting href=#
  e.preventDefault();

  try {
    // 1) Filter results on radio button selection
    const selectedGenres = searchView.selectCheckboxes();

    if (selectedGenres.length === 0) {
      //If nothing selected, display message
      searchView.searchNoSelection();

      //Card section appears
      showSection(elements.cardSection);
    } else {
      //In case already populated, reset cards data
      cardsView.clearCards();
      if (state.cards) {
        state.cards.list = [];
      }

      // 2) Display selected genre in header
      searchView.displayGenreHeader(selectedGenres);

      // 3) Render loader
      renderLoader(elements.cardRow);

      // 4) Card section appears
      showSection(elements.cardSection);

      // 5) Window scrolls down to loader
      scrollToTop(elements.cardSection);

      // 5) Send API request
      await controlSearchList(selectedGenres);

      // 6) Clear loader
      clearLoader(elements.cardRow);

      if (state.anime.list.length === 0) {
        //If no results, display message
        searchView.searchNoResults(selectedGenres);
      } else if (state.anime.list.length < 3) {
        //Less than 3 options with the selected genre(s)? Run for list length
        controlGenerateCard(state.anime.list.length);
      } else {
        // 4) Select 3 random entries and fill cards
        controlGenerateCard(3);
      }
    }

    // 5) Window scrolls down to cards
    scrollToTop(elements.cardSection);

    // 6) Clear checkboxes
    genreView.clearAllCheckboxes();
  } catch {
    //Generate error message to user interface
    genreView.genreFormError();

    //Hide card section
    cardsView.hideCardSection();
  }
});

//RUNS ON "X" BUTTON ON CARDS

elements.cardRow.addEventListener("click", e => {
  //Event delegation to btn on card
  const btn = e.target.closest(`.${elementStrings.cardClose}`);

  if (btn) {
    //Grab id from card
    const id = parseInt(btn.dataset.id, 10);

    if (state.anime.list.length === 0 && state.cards.list.length === 1) {
      //No replacements, last card
      //Delete current card data
      state.cards.deleteCard(id);

      //Display message
      cardsView.noCardsLeft();
    } else if (state.anime.list.length === 0 && state.cards.list.length <= 3) {
      //No replacements, cards left
      //Delete current card data
      state.cards.deleteCard(id);

      //Remove card from view
      cardsView.deleteCardView(btn);
    } else {
      //Replace card in data and view
      controlReplaceCard(id, btn);
    }
  }
});
