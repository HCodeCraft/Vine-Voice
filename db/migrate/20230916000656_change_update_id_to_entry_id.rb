class ChangeUpdateIdToEntryId < ActiveRecord::Migration[6.1]
  def change
    rename_column :comments, :update_id, :entry_id
  end
end
