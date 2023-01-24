const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const filmList = document.getElementById("film-list");
const initialPlaceholder = document.getElementById("initial-placeholder");
let filmIdList = [];

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  fetch(`https://www.omdbapi.com/?apikey=a5474722&s=${searchInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      filmList.innerHTML = "";
      initialPlaceholder.innerHTML = "";
      filmList.style.padding = "2.75em";
      filmIdList = [];
      noDataText();
      getFilmIds(data);
      renderSearchResultsList(filmIdList);
    });
});

function getFilmIds(data) {
  data.Search.forEach((element) => {
    filmIdList.push(element.imdbID);
  });
  return filmIdList;
}

function noDataText() {
  if (searchInput.value === "") {
    return (filmList.innerHTML = `<section class="no-data">
        <p class="no-data-text">Unable to find what you're looking for. Please try another search.
        </p>
      </section>`);
  }
}

function add(movie) {
  if (localStorage.getItem(`${movie.id}`)) {
    return "";
  } else {
    localStorage.setItem(`${movie.id}`, `${movie.id}`);
  }
}

const renderSearchResultsList = function (arr) {
  arr.forEach((id) => {
    fetch(`https://www.omdbapi.com/?apikey=a5474722&i=${id}`)
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
                <a href="#" class="watchlist-add-link" onclick="add(${data.imdbID})" id="${data.imdbID}">
                <img
                  src="./images/plus-icon.png"
                  alt="add to watchlist"
                  class="add-icon"
                />
                <p>Watchlist</p>
                </a>
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
