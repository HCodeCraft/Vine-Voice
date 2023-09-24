class PlantsController < ApplicationController
    # before_action :authorize

    def index
        render json: Plant.all
      end

      def search
        @plants = Plant.ransack(common_name_cont: params[:q]).result(distinct: true).limit(5)
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
        params.require(:plant).permit(:common_name, :scientific_name, :image_url)
          
          # , :description, :water_rec, :sunlight, :indoor, :cycle, :poisonous, :edible, :medicinal)
      end
end
