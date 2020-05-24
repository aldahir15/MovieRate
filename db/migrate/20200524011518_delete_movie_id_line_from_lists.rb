class DeleteMovieIdLineFromLists < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :movie_id
  end
end
