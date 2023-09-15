class RenameUpdateToRecord < ActiveRecord::Migration[6.1]
  def change
    rename_table :updates, :records
  end
end
