class RenameRecordtoEntry < ActiveRecord::Migration[6.1]
  def change
    rename_table :records, :entries
  end
end
