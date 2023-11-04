class EntrySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :nickname, :location, :notes, :plant_id, :health, :open_to_advice, :create_date, :picture, :username, :user_id, :problems
  has_many :comments



  def picture
    rails_blob_path(object.picture, only_path:true) if object.picture.attached?
  end


  def create_date
    created_at = object.created_at
    formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
  end
end
