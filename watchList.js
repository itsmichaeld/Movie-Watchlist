const watchlist = document.getElementById("watchlist");
const emptyWatchlistText = document.getElementById("empty-watchlist");
let filmsArray = { ...localStorage };

window.addEventListener("load", (e) => {
  watchlist.style.padding = "2.75em";
  renderWatchList(filmsArray);
  emptyWatchlist();
});

function remove(movie) {
  localStorage.removeItem(`${movie.id}`);
  filmsArray = { ...localStorage };
  renderWatchList(filmsArray);
  emptyWatchlist();
}

function emptyWatchlist() {
  if (localStorage.length === 0) {
    watchlist.style.padding = "0";
    emptyWatchlistText.innerHTML = `<h3 class="empty-watchlist-header">
      Your watchlist is looking a little empty...
    </h3>
    <a href="index.html" class="add-to-list-link">
      <img
        src="./images/plus-icon.png"
        alt="add to watchlist"
        class="add-icon"
      />
      <p class="empty-list-text">Let's add some movies</p>
    </a>`;
  }
}

const renderWatchList = function (arr) {
  watchlist.innerHTML = "";
  Object.values(arr).forEach((id) => {
    fetch(`https://www.omdbapi.com/?apikey=a5474722&i=${id}`)
      .then((res) => res.json())
      .then((data) => {
        return (watchlist.innerHTML += `<article class="film">
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
                  <a href="#" class="watchlist-add-link"
                  onclick="remove(${data.imdbID})" id="${data.imdbID}">
                  <img
                    src="./images/minus-icon.png"
                    alt="remove from watchlist"
                    class="remove-icon"
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
