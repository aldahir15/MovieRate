class AddMovieArrayToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :movie_ids, :integers, array: true, default: []
  end
end
