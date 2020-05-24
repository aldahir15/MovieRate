@lists.each do |list|
  json.set! list.id do
    json.extract! list, :name, :movies
  end
end
