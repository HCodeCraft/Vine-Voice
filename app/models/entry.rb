class Entry < ApplicationRecord
    belongs_to :user
    belongs_to :plant
    has_many :comments
end
