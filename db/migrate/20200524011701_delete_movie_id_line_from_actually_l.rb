class DeleteMovieIdLineFromActuallyL < ActiveRecord::Migration[5.1]
  def change
    remove_column :lists, :movie_id
  end
end
