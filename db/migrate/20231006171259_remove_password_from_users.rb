class RemovePasswordFromUsers < ActiveRecord::Migration[6.1]
  def change
    def change
      remove_column :users, :password, :string
    end
  end
end
