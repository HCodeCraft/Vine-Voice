class ChangeImageToPictureInEntries < ActiveRecord::Migration[6.1]
  def change
    rename_column :entries, :image, :picture
  end
end
