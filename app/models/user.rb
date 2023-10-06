class User < ApplicationRecord
  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         jwt_revocation_strategy: JwtDenylist

  has_many :comments
  has_many :records
  has_many :plants, -> { distinct }, through: :entries
  # has_secure_password
end
