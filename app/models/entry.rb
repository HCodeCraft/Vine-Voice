class Entry < ApplicationRecord
    belongs_to :user
    belongs_to :plant
    has_many :comments


    def username
        self.user.username
    end
end
