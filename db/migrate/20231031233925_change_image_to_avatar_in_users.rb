class ChangeImageToAvatarInUsers < ActiveRecord::Migration[6.1]
  def change
    rename_column :users, :image, :avatar
  end
end
