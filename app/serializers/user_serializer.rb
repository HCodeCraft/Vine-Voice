class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :username, :name, :privacy, :email, :status, :id, :receive_dev_emails, :admin, :avatar, :avatar_thumbnail
  has_many :entries
  has_many :plants

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end

  # def avatar_thumbnail
  #   rails_representation_url(object.avatar.variant(resize_to_limit: [200, 200]).processed, only_path: true) if object.avatar.attached?
  # end

  def avatar_thumbnail
  Rails.application.routes.url_helpers.rails_representation_url(object.avatar.variant(resize_to_limit: [200, 200]).processed, only_path: true) if object.avatar.attached?
end
end
