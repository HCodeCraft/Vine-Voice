class UserSerializer < ActiveModel::Serializer
include Rails.application.routes.url_helpers
  attributes :username, :name, :privacy, :email, :status, :id, :recieve_dev_emails, :admin, :avatar
  has_many :entries
  has_many :plants

def avatar
  rails_blob_path(object.avatar, only_path:true) if object.avatar.attached?
end

end
