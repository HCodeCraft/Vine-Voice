class Comment < ApplicationRecord
    belongs_to :user
    belongs_to :entry

    def username
        self.user.username
    end

end
