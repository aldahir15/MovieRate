@ratings.each do |rating|
  json.set! rating.id do
    json.extract! rating, :id, :rate, :movie_id
  end
end