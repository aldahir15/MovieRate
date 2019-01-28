class Movie < ApplicationRecord

  has_one :rating,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :Rating
end
