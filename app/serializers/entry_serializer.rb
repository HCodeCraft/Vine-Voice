class EntrySerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :nickname, :location, :notes, :plant_id, :health, :open_to_advice, :create_date, :picture, :problems, :username, :user_id, :user
  has_many :comments
  belongs_to :user
  belongs_to :plant




  def picture
    rails_blob_path(object.picture, only_path:true) if object.picture.attached?
  end


  def create_date
    formatted_time = object.created_at&.strftime("%A, %B %d, %Y, %I:%M %p") || "N/A"
    formatted_time
  end
  
  
end
