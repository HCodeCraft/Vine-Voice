class Plant < ApplicationRecord
    has_many :updates
    has_many :users, through: :updates
end
