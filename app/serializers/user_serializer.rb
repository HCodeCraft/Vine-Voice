class UserSerializer < ActiveModel::Serializer
  # include Rails.application.routes.url_helpers

  attributes :username, :name, :avatar_url, :privacy, :email, :status, :id, :recieve_dev_emails, :admin, :image
  has_many :entries
  has_many :plants

  # def image_path
  #   rails_blob_path(object.image, only_path: true) if object.image.attached?
  # end

  # login worked but then there was a stack error when I commented out entries
end
