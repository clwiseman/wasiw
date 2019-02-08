//Generate random integer between 0 and max value
const getRandom = max => Math.floor(Math.random() * max);

//Structure for anime cards
export default class Cards {
  constructor() {
    this.list = [];
  }

  getCardData(animeObj) {
    const card = { ...animeObj };

    this.list.push(card);

    return card;
  }

  selectRandom(animeList) {
    //random number
    const index = getRandom(animeList.length);
    const randomAnime = animeList[index];

    return randomAnime;
  }

  deleteCard(id) {
    const index = this.list.findIndex(el => el.id === id);
    this.list.splice(index, 1);
  }
}
