class Collection < List
  has_many :movies,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :Movie
end
