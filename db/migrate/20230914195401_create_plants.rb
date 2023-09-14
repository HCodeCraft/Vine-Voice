class CreatePlants < ActiveRecord::Migration[6.1]
  def change
    create_table :plants do |t|
      t.string :common_name
      t.string :scientific_name
      t.string :image_url
      t.string :description
      t.string :water_rec
      t.string :sunlight
      t.boolean :indoor
      t.string :cycle
      t.boolean :poisonous
      t.boolean :edible
      t.boolean :medicinal
      t.timestamps
    end
  end
end
