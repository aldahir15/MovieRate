export const fetchMovies = () => {
  return $.ajax({
    method: 'GET',
    url: `/api/movies/`
  });
};

export const fetchUserMovies = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}/movies/`
  });
};

export const fetchMovie = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/movies/${id}`
  });
};

export const createMovie = (movie) => {
  return $.ajax({
    method: 'POST',
    url: `/api/movies/`,
    data: {movie}
  });
};


export const deleteMovie = (id) => {
  return $.ajax({
    url: `/api/movies/${id}`,
    method: 'DELETE'
  });
};