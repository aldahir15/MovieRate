@movies_and_ratings.each do |movie_and_rating|
  json.set! movie_and_rating[0].id do

    json.id movie_and_rating[0].id
    json.title movie_and_rating[0].title
    json.description movie_and_rating[0].description
    json.img movie_and_rating[0].img
    json.year movie_and_rating[0].year
    json.genre movie_and_rating[0].genre
    json.imdb_id movie_and_rating[0].imdb_id
    json.rating movie_and_rating[1]

  end
end
