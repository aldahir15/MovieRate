export const fetchMovieList = (id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}/lists`
  });
};
