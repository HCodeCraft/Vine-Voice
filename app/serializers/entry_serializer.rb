class EntrySerializer < ActiveModel::Serializer
  attributes :id, :nickname, :location, :notes, :image, :plant_id, :health, :problems, :open_to_advice, :create_date
  has_many :comments

  # took out attribute :username and :user_id

  def create_date
    created_at = object.created_at
    formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
  end
end
