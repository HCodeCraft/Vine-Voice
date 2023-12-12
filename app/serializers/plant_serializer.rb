class PlantSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :common_name, :scientific_name, :image_url, :med_image_url, :description, :water_rec, :sunlight, :indoor, :cycle, :poisonous_to_humans, :poisonous_to_pets, :edible, :medicinal, :short_description, :create_date, :sunlight_emojis, :water_emojis, :in_out_emojis, :cycle_emojis, :human_poison_emoji, :pet_poison_emoji, :edible_emoji, :medicinal_emoji
  has_many :entries, include: [:users]
  has_many :users
  has_many :comments

  def create_date
    created_at = object.created_at

    if created_at.present?
      formatted_time = created_at.strftime("%B %d, %Y, %I:%M %p")
    else
      # Handle the case where created_at is nil
      formatted_time = "N/A"  # or any default value or message you prefer
    end
  end

  def short_description
    object.description.nil? ? "" : object.description.length < 200 ? object.description : "#{object.description[0..200]}..."
  end

  def sunlight_emojis
    emojis = []

    # Convert all values in the sunlight array to lowercase
    sunlight = object.sunlight&.map(&:downcase)

    if sunlight&.include?("full sun")
      emojis << "☀️ Full Sun"
    end

    if sunlight&.include?("part shade")
      emojis << "🌤️ Part Shade"
    end

    if sunlight&.include?("sun-part shade")
      emojis << "🌤️/🌥️ Part Sun/Part Shade"
    end

    if sunlight&.include?("full shade")
      emojis << "🌥️ Full Shade"
    end

    emojis.join(", ")
  end

  def water_emojis

    water = object.water_rec.downcase
    case water
    when "none"
      "🚫 None"
    when "minimum"
      "💧 Minimum"
    when "average"
      "💧💧 Average"
    when "frequent"
      "💧💧💧 Frequent"
    else
      nil
    end
  end

  def in_out_emojis
    object.indoor ? "🏠 Indoor" : "🌳 Outdoor"
  end

  def cycle_emojis
    if object.cycle
      if object.cycle.include?("Perennial")
        "🔁 Perennial"
      elsif object.cycle.include?("Annual")
        "🔂 Annual"
      else
        "Unknown cycle"
      end
    else
      "Cycle data not available"
    end
  end

  def human_poison_emoji
    object.poisonous_to_humans ? "☠️ Poisonous to Humans" : "✔️ Not Poisonous to Humans"
  end

  def pet_poison_emoji
    object.poisonous_to_pets ? "🚫🙀 Poisonous to Pets" : "❤️🐶 Not Poisonous to Pets"
  end

  def edible_emoji
    object.edible? ? "🥗 Edible" : nil
  end

  def medicinal_emoji
    object.medicinal ? "🍵 Medicinal" : nil
  end
end
