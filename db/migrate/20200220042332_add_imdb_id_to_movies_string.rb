class AddImdbIdToMoviesString < ActiveRecord::Migration[5.1]
  def change
    change_table :movies do |t|
      t.change :imdb_id, :string
    end
  end
end
