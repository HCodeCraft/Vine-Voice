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
  if object.avatar.attached?
    begin
      variant = object.avatar.variant(resize_to_limit: [200, 200]).processed
      rails_representation_url(variant, only_path: true)
    rescue ActiveStorage::FileNotFoundError
      # Handle the case where the file is not found
      # For example, you can provide a default avatar URL or return nil
      nil
    end
  end
end


end
