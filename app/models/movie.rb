class Movie < ApplicationRecord
  validates :title, :uniqueness => true

  has_many :rating,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :Rating

  has_many :listmoviejoiner,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :ListMovieJoiner
end
