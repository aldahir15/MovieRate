class AddAttributesToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :released, :string
    add_column :movies, :rated, :string
    add_column :movies, :runtime, :string
    add_column :movies, :imdb_rating, :string
    add_column :movies, :rotten_tomatoes_rating, :string
  end
end
