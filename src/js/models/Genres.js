//List of possible genres from site
const genreQuery = `query { GenreCollection }`;

export default class Genres {
  constructor() {
    this.list = [];
    this.query = genreQuery;
  }

  addGenres(requestData) {
    requestData.GenreCollection.forEach(genre => {
      this.list.push(genre);
    });
  }
}

/*
//List of genres to be replaced by data request
const genres = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Ecchi",
  "Fantasy",
  "Horror",
  "Mahou Shoujo",
  "Mecha",
  "Music",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Sports",
  "Supernatural",
  "Thriller"
];
*/
