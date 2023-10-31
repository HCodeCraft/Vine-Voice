class User < ApplicationRecord
  has_many :entries
  has_many :comments
  has_many :plants, -> { distinct }, through: :entries
  has_secure_password
  # has_one_attached :image



end
