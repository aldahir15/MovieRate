class List < ApplicationRecord
  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  has_many :listmoviejoiner,
    primary_key: :id,
    foreign_key: :list_id,
    class_name: :ListMovieJoiner

  has_many :movies, :through => :listmoviejoiner
end
