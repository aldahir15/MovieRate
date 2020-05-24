class RemoveMovieIdsActuallyFromLists < ActiveRecord::Migration[5.1]
  def change
    remove_column :lists, :movie_ids
  end
end
