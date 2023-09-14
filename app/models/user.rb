class User < ApplicationRecord
    has_many :comments
    has_many :updates
    has_many :plants, -> { distinct }, through: :updates
    has_secure_password

    
end
