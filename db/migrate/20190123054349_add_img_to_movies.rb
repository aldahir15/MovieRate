class AddImgToMovies < ActiveRecord::Migration[5.1]
  def change
    add_column :movies, :img, :string
  end
end
