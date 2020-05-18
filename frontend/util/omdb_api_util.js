const API_KEY = document.head.querySelector('[name="api-key"]').content;
const TRAILER_KEY = document.head.querySelector('[name="trailer-key"]').content;

export const fetchOMDBMovie = (title, year = 2020) => {
  title = title.split(" ").join("+");
  title = escape(title)
  // console.log(encodeURIComponent(title));
  return $.ajax({
    method: 'GET',
    url: `https://www.omdbapi.com/?t=`+ title + `&y=` + year + `&apikey=${API_KEY}`
  });
};

function escapeShowTitle(title) {
  title = title.replace(/'/g, "")
  title = escape(title)
  return title
}

export const fetchMovieTrailer = (title, year = 2020) => {
  title = title.split(" ").join("+");
  title = escape(title)
  // console.log(encodeURIComponent(title));
  let movieId;
  // $.ajax({
  //   method: 'GET',
  //   url: `https://api.themoviedb.org/3/search/movie?api_key=${TRAILER_KEY}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`
  // }).then(movie => {
  //   movieId = movie.results[0].id;
  // });
  // console.log(movieId);
  return $.ajax({
    method: 'GET',
    url: `https://api.themoviedb.org/3/search/movie?api_key=${TRAILER_KEY}&language=en-US&query=${title}&page=1&include_adult=false&year=${year}`
    }).then(movie => {
      movieId = movie.results[0].id;
      return $.ajax({
        method: 'GET',
        url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TRAILER_KEY}`
      })
    })
};