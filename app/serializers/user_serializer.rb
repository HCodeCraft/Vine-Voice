class UserSerializer < ActiveModel::Serializer
  attributes :username, :name, :avatar_url, :image, :privacy, :email, :status, :id, :recieve_dev_emails, :entries
  has_many :entries
  has_many :plants
end
