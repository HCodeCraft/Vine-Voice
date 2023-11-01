class EntrySerializer < ActiveModel::Serializer
  include JSONAPI::Serializer
  attributes :id, :nickname, :location, :notes, :plant_id, :health, :problems, :open_to_advice, :create_date, :picture_url
  has_many :comments

  def picture_url
    Rails.application.routes.url_helpers.url_for(picture) if picture.attached?
  end

  def create_date
    created_at = object.created_at
    formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
  end
end
