class CommentSerializer < ActiveModel::Serializer
  attributes :text, :username, :create_date, :id
  belongs_to :entry


  def create_date
    created_at = object.created_at
    formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
  end
end
