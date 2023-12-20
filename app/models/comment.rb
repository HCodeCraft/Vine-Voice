class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :entry

  validates :text, presence: true, length: { minimum: 10, maximum: 750 }

  def username
    self.user&.username
  end

  def avatar_thumbnail
    if self.user&.avatar&.attached?
      variant = self.user.avatar.variant(resize_to_limit: [120, 120]).processed
      Rails.application.routes.url_helpers.rails_representation_url(variant, only_path: true)
    end
  end
end
