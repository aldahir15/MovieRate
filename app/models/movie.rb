class Movie < ApplicationRecord
  validates :title, :uniqueness => true

  has_many :rating,
    primary_key: :id,
    foreign_key: :movie_id,
    class_name: :Rating
end
