class PlantsController < ApplicationController
  before_action :authorize

  def index
    Rails.logger.debug("Session contents in plant: #{session.inspect}")

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
    plant = find_plant
    plant.update(plant_params)
    render json: plant
  end

  def destroy
    plant = find_plant
    plant.destroy
    head :no_content
  end

  private

  def find_plant
    Plant.find_by(id: params[:id])
  end

  def plant_params
    params.require(:plant).permit(:common_name, :scientific_name, :image_url, :description, :water_rec, :sunlight, :indoor, :cycle, :poisonous_to_humans, :poisonous_to_pets, :edible, :medicinal, :med_image_url, entries_attributes: [:nickname, :location, :notes, :image, :user_id, :plant_id, :health, :problems, :open_to_advice])

    # , :description, :water_rec, :sunlight, :indoor, :cycle, :poisonous, :edible, :medicinal)
  end
end
