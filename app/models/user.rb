class User < ApplicationRecord
  after_create_commit :avatar_thumbnail
  # testing ^
  has_many :entries, dependent: :destroy
  has_many :comments
  has_many :plants, -> { distinct }, through: :entries
  has_secure_password
  has_one_attached :avatar 
  
  validates :username, presence: true, length: { in: 3..15 }, uniqueness: true, unless: :username_not_changed?
  validates :email, presence: true, uniqueness: { on: :create }
  validates :password, presence: true, length: { minimum: 5 }, on: :create



  def username_not_changed?
    username_was == username
  end


  def avatar_url
    Rails.application.routes.url_helpers.url_for(avatar) if avatar.attached?
end

end
