class EntrySerializer < ActiveModel::Serializer
  attributes :id, :nickname, :location, :notes, :image, :plant_id, :health, :problems, :open_to_advice, :username
  belongs_to :user
  belongs_to :plant
end
