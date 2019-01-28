class Rating < ApplicationRecord
  belongs_to :movie,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :Movie
end
