class Entry < ApplicationRecord
    belongs_to :user
    belongs_to :plant
    has_many :comments
    has_one_attached :picture



    def username
        self.user.username
    end

    def user_id
        self.user.id
    end
end
