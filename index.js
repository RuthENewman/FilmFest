const key = '83c54f70'

$(document).ready(() => {
  $('#searchForm').on('submit', () => {
    let query = $('#search').val();
    findFilms(query)
    event.preventDefault();
  });
});

const state = {
  films: []
}

const findFilms = (query) => {
  axios.get('http://www.omdbapi.com?apikey=' + key + '&s=' + query)
  .then((response) => {
    state.films = response.data.Search
    let filmDetails = '';
    $.each(state.films, (index, film) => {
      filmDetails += `
      <div class="film" data-id="${index}">
        <img class="filmPoster" src=${film.Poster} />
        <h5 class="filmName">${film.Title}</h5>
        <a onclick="filmSelected('${film.imdbID}')" class="imdbButton" href="#">Get details</a>
      </div>
      `;
    });
    $('#films').html(filmDetails)
  })
  .catch((error) => {
    console.log(error)
  })
}

const filmSelected = id => {
  sessionStorage.setItem('filmId', id);
  window.location = 'film.html';
  return false;
}

const findFilm = () => {
  let filmId = sessionStorage.getItem('filmId');
  axios.get('http://www.omdbapi.com?apikey=' + key + '&i=' + filmId)
  .then((response) => {
    console.log(response);
    let film = response.data;

    let filmDetail = `
      <div class="singleFilm">
        <img class="singleFilmPoster" src=${film.Poster}/>
        <div id="plot">
          <p>${film.Plot}</p>
        </div>
        <h2>${film.Title}</h2>
        <h4 class="filmProfile">Director: ${film.Director}</h4>
        <h4 class="filmProfile">Genre: ${film.Genre}</h4>
        <h4 class="filmProfile">Released: ${film.Released}</h4>
        <h4 class="filmProfile">IMDB Rating: ${film.imdbRating}</h4>
        <h4 class="filmProfile">Cast: ${film.Actors}</h4>
        <a class="imdbButton" href="http://imdb.com/title/${film.imdbID}" target="_blank">Go to IMDB</a>
        <a class="imdbButton" href="index.html">Back to Search</a>
      </div>

    `;
    $('#film').html(filmDetail);
  })

  .catch((error) => {
    console.log(error)
  })
}
