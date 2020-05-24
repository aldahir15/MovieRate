class AddMovieIdToLists < ActiveRecord::Migration[5.1]
  def change
    add_column :lists, :movie_id, :integer
  end
end
