class User < ApplicationRecord
  has_many :entries
  has_many :comments
  has_many :plants, -> { distinct }, through: :entries
  has_secure_password
  has_one_attached :avatar 
  
  # do |attachable|
  #   attachable.variant :thumb, resize_to_limit: [100, 100]
  # end


  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
end



end
