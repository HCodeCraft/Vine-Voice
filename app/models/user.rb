class User < ApplicationRecord
  has_many :entries, dependent: :destroy
  has_many :comments
  has_many :plants, -> { distinct }, through: :entries
  has_secure_password
  has_one_attached :avatar 
  
  validates :username, presence: true, uniqueness: true, length: { in: 3..15 }
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 5 }


  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
end

end
