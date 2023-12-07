class Entry < ApplicationRecord
    belongs_to :user
    belongs_to :plant
    has_many :comments, dependent: :destroy
    has_one_attached :picture

    

    validates :nickname, length: { maximum: 20 }
    validates :location, length: { maximum: 30 }
    validates :notes, presence: true, length: { minimum: 20, maximum: 750 }
    validate :validate_problems_limit

    def username
    self.user.username
      end
      
      def user_id
  self.user.id
      end

      
      
  
    private
  
    def validate_problems_limit
      if problems.length > 10
        errors.add(:problems, "can't have more than 10 items")
      end
    end

end
