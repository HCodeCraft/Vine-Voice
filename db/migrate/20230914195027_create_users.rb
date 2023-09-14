class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :name
      t.string :avatar_url
      t.string :image
      t.string :password
      t.boolean :privacy
      t.string :email
      t.boolean :recieve_dev_emails
      t.string :status
      t.boolean :admin
      t.timestamps
    end
  end
end
