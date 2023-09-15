class User < ApplicationRecord
    has_many :comments
    has_many :records
    has_many :plants, -> { distinct }, through: :records
    has_secure_password

    
end
