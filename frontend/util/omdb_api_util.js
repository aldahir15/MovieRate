export const fetchOMDBMovie = (title) => {
  title = title.split(" ").join("+");
  title = escape(title)
  // console.log(encodeURIComponent(title));
  return $.ajax({
    method: 'GET',
    url: `http://www.omdbapi.com/?t=`+ title + `&apikey=58ddf78`
  });
};

function escapeShowTitle(title) {
  title = title.replace(/'/g, "")
  title = escape(title)
  return title
}