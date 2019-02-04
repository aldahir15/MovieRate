const API_KEY = document.head.querySelector('[name="api-key"]').content;

export const fetchOMDBMovie = (title) => {
  title = title.split(" ").join("+");
  title = escape(title)
  // console.log(encodeURIComponent(title));
  return $.ajax({
    method: 'GET',
    url: `https://www.omdbapi.com/?t=`+ title + `&apikey=${API_KEY}`
  });
};

function escapeShowTitle(title) {
  title = title.replace(/'/g, "")
  title = escape(title)
  return title
}