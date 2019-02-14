//Structure for anime from search
class Anime {
  constructor(
    id,
    idMal,
    genres,
    titleRomaji,
    titleEnglish,
    score,
    season,
    year,
    synopsis,
    image,
    url
  ) {
    this.id = id;
    this.idMal = idMal;
    this.genres = genres;
    this.titleRomaji = titleRomaji;
    this.titleEnglish = titleEnglish;
    this.score = score;
    this.season = `${season} ${year}`;
    this.synopsis = synopsis;
    this.image = image;
    this.url = url;
  }
}

export default class Search {
  constructor() {
    this.list = [];
  }

  //Set query value for GraphQL request

  setQuery(selectedArray) {
    const arrayString = `["${selectedArray.join(`", "`)}"]`;

    this.query = `query {
        Page (page: 1, perPage: 100) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (genre_in: ${arrayString}, type: ANIME) {
            id
            idMal
            genres
            title {
              romaji
              english
            }
            averageScore
            season
            startDate {
              year
            }
            description
            coverImage {
              large
            }
            siteUrl
          }
        }
      },`;
  }

  getAnime(requestData) {
    try {
      const animeData = requestData.Page.media;
      const animeArray = [];

      animeData.forEach(anime => {
        animeArray.push(
          new Anime(
            anime.id,
            anime.idMal,
            anime.genres,
            anime.title.romaji,
            anime.title.english,
            anime.averageScore,
            anime.season,
            anime.startDate.year,
            anime.description,
            anime.coverImage.large,
            anime.siteUrl
          )
        );
      });
      return animeArray;
    } catch (error) {
      console.warn(error.message);
    }
  }

  removeAnime(animeID) {
    const index = this.list.findIndex(el => el.id === animeID);
    this.list.splice(index, 1);
  }
}
