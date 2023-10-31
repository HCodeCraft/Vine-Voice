class Plant < ApplicationRecord
    has_many :entries
    has_many :users, through: :entries
    has_many :comments, through: :entries
    accepts_nested_attributes_for :entries



  

end
