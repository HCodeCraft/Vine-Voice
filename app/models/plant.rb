class Plant < ApplicationRecord
    has_many :entries, dependent: :destroy
    has_many :users, through: :entries
    has_many :comments, through: :entries
    accepts_nested_attributes_for :entries


    validates :common_name, presence: true, length: { maximum: 255 }
    validates :scientific_name, presence: true, uniqueness: true, length: { maximum: 255 }
    validates :description, presence: true


  

end
