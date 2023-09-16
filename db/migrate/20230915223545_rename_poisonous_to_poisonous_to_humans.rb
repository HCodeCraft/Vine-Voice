class RenamePoisonousToPoisonousToHumans < ActiveRecord::Migration[6.1]
  def change
    rename_column :plants, :poisonous, :poisonous_to_humans
  end
end
