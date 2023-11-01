class UserSerializer < ActiveModel::Serializer
  include JSONAPI::Serializer

  attributes :username, :name, :privacy, :email, :status, :id, :recieve_dev_emails, :admin, :avatar_url, :avatar
  has_many :entries
  has_many :plants



end
