class PlantsController < ApplicationController
  before_action :authorize

  def index
    render json: Plant.all
  end

  def show
    plant = find_plant
    render json: plant
  end

  def search
    search_query = params[:q]

    # Use Ransack to search in both common_name and scientific_name
    @plants = Plant.ransack(common_name_cont: search_query).result(distinct: true).limit(5)

    render json: @plants
  end

  def create
    plant = Plant.create!(plant_params)
    render json: plant, status: :created
  end

  def update
    if @current_user.admin === true
      plant = find_plant
      plant.update(plant_params)
      render json: plant
    else
      render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
    end
  end

  def destroy
    if @current_user.admin === true
      plant = find_plant
      deletedPlantId = plant.id
      plant.destroy
      render json: { deletedPlantId: deletedPlantId }
    else
      render json: { error: "You are not authorized to perform this action" }
    end
  end

  private

  def find_plant
    Plant.find_by(id: params[:id])
  end

  def plant_params
    params.require(:plant).permit(
      :common_name,
      :scientific_name,
      :image_url,
      :description,
      :water_rec,
      :sunlight,
      :indoor,
      :cycle,
      :poisonous_to_humans,
      :poisonous_to_pets,
      :edible,
      :medicinal,
      :med_image_url,
      :id,
      entries_attributes: [
        "entry[nickname]",
        "entry[location]",
        "entry[notes]",
        "entry[picture]",
        "entry[user_id]",
        "entry[plant_id]",
        "entry[health]",
        "entry[open_to_advice]",
        "entry[problems]: []",
      ],
    )
  end
end
