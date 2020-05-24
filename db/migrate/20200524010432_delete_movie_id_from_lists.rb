class DeleteMovieIdFromLists < ActiveRecord::Migration[5.1]
  def change
    change_column :lists, :movie_id, :integer, array: true, default: []
  end
end
