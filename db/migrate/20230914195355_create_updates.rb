class CreateUpdates < ActiveRecord::Migration[6.1]
  def change
    create_table :updates do |t|
      t.string :nickname
      t.string :location
      t.string :notes
      t.string :image
      t.integer :user_id
      t.integer :plant_id
      t.integer :health
      t.string :problems, array: true, default: []
      t.boolean :open_to_advice
      t.timestamps
    end
  end
end
