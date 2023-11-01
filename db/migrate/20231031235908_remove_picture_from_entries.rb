class RemovePictureFromEntries < ActiveRecord::Migration[6.1]
  def change
    remove_column :entries, :picture
  end
end
