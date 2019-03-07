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

  setQuery(selectedArray, page) {
    const arrayString = `["${selectedArray.join(`", "`)}"]`;

    this.query = `query {
        Page (page: ${page.toString()}, perPage: 50) {
          pageInfo {
            total
            currentPage
            lastPage
            hasNextPage
            perPage
          }
          media (genre_in: ${arrayString}, type: ANIME, isAdult: false, format_not_in: [MUSIC, SPECIAL, ONA, OVA], status_in:[FINISHED, RELEASING]) {
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
    const data = requestData.data.data.Page;

    const animeData = requestData.data.data.Page.media;
    const animeArray = [];

    animeData.forEach(anime => {
      //To remove html tags from within the synopsis
      const div = document.createElement("div");
      div.innerHTML = anime.description;
      anime.description = div.innerText;

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

    const searchObj = {
      lastPage: data.pageInfo.lastPage,
      hasNextPage: data.pageInfo.hasNextPage,
      currentPage: data.pageInfo.currentPage,
      animeArray
    };

    return searchObj;
  }

  removeAnime(animeID) {
    const index = this.list.findIndex(el => el.id === animeID);
    this.list.splice(index, 1);
  }
}
