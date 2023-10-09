class User < ApplicationRecord
  has_many :entries
  has_many :comments
  has_many :records
  has_many :plants, -> { distinct }, through: :entries
  has_secure_password
end
