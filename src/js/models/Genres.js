//List of possible genres from site
const genreQuery = `query { GenreCollection }`;

export default class Genres {
  constructor() {
    this.list = [];
    this.query = genreQuery;
  }

  addGenres(requestData) {
    const genres = requestData.data.data.GenreCollection;

    const index = genres.indexOf("Hentai");
    genres.splice(index, 1);

    genres.forEach(genre => {
      this.list.push(genre);
    });
  }
}

/*
//List of genres replaced by data request
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
