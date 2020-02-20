@movies.each do |movie|
  json.set! movie.id do
    json.extract! movie, :id, :title, :description, :rating, :img, :year, :genre, :imdb_id
  end
end