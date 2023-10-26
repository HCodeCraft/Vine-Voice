class EntriesController < ApplicationController
  before_action :authorize

    def index
      Rails.logger.debug("Session contents: #{session.inspect}")
        entries = Entry.all
        render json: entries
      end

      # not sure if this is right but I want to show entries by more than just the current user
      def show
        entry = Entry.find_by(id: params[:id])
        render json: entry
      end
      
      def create
        @current_user = User.find_by(id: session[:user_id])
        Rails.logger.debug("Current User: #{@current_user.inspect}")
        new_entry = @current_user.entries.create!(entry_params)
        render json: new_entry
      end
      
      def update
        entry = find_entry
        entry.update(entry_params)
        render json: entry
      end
      
      def destroy
        entry = find_entry
        entry.destroy
        head :no_content
      end
      
      private
      
      def find_entry
        entry = @current_user.entries.find_by(id: params[:id])
      end
      
      def entry_params
        params.require(:entry).permit(:nickname, :location, :notes, :image, :user_id, :plant_id,  :open_to_advice, :health, problems: [])
      end
      
end
