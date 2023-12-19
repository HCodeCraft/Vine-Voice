class RenameReceiveDevEmailsColumnInUsers < ActiveRecord::Migration[6.0]
  def change
    rename_column :users, :recieve_dev_emails, :receive_dev_emails
  end
end
