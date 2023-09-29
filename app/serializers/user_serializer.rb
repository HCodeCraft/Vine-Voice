class UserSerializer < ActiveModel::Serializer
  attributes :username, :name, :avatar_url, :image, :privacy, :email, :status
end
