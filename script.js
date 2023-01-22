// omdb api key: a5474722
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmList = document.getElementById("film-list");
let filmIdList = [];

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(`http://www.omdbapi.com/?apikey=a5474722&s=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      filmList.innerHTML = "";
      filmIdList = [];
      getFilmIds(data);
      getSearchResultsList(filmIdList);
    });
});

function getFilmIds(data) {
  data.Search.forEach((element) => {
    filmIdList.push(element.imdbID);
  });
  return filmIdList;
}

const getSearchResultsList = function (arr) {
  arr.forEach((id) => {
    fetch(`http://www.omdbapi.com/?apikey=a5474722&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        return (filmList.innerHTML += `<article class="film">
          <img src="${data.Poster}" class="movie-poster" alt="${data.Title} poster" />
          <div class="movie-details">
            <div class="title-rating">
              <h3 class="movie-title">${data.Title}</h3>
              <img
                src="./images/star-icon.png"
                class="rating-star"
                alt="star rating"
              />
              <p class="rating">${data.imdbRating}</p>
            </div>
            <div class="movie-time-genre-add">
              <p class="movie-time">${data.Runtime}</p>
              <p class="movie-genre">${data.Genre}</p>
              <img
                src="./images/plus-icon.png"
                alt="add to watchlist"
                class="add-icon"
              />
              <p>Watchlist</p>
            </div>
            <p class="movie-description">
              ${data.Plot}
            </p>
          </div>
        </article>
        <hr class="film-divider" />`);
      });
  });
};
