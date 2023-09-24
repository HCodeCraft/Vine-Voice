class AddMediumImageToPlants < ActiveRecord::Migration[6.1]
  def change
    add_column :plants, :med_image_url, :string
  end
end
