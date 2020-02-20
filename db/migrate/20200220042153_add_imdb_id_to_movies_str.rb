class AddImdbIdToMoviesStr < ActiveRecord::Migration[5.1]
  def change
    change_table :movies do |t|
      t.change :imdb_id, :integer
    end
  end
end
