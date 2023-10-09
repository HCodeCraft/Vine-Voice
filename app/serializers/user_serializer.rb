class UserSerializer < ActiveModel::Serializer
  attributes :username, :name, :avatar_url, :image, :privacy, :email, :status, :id
  has_many :entries
  has_many :plants
end
