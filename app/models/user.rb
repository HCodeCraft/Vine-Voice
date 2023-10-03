class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
    has_many :comments
    has_many :records
    has_many :plants, -> { distinct }, through: :entries
    has_secure_password

    
end
