class Plant < ApplicationRecord
    has_many :entries, dependent: :destroy
    has_many :users, through: :entries
    has_many :comments, through: :entries
    accepts_nested_attributes_for :entries

    #removed the -> distinct from users to entries



  

end
