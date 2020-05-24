class CreateListMovieJoiners < ActiveRecord::Migration[5.1]
  def change
    create_table :list_movie_joiners do |t|
      t.string :movie_id
      t.string :integer
      t.string :list_id
      t.string :integer

      t.timestamps
    end
  end
end
