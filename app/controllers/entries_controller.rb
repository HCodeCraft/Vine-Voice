class EntriesController < ApplicationController
    def index
        entries = Entry.all
        render json: entries
      end

      # not sure if this is right but I want to show entries by more than just the current user
      def show
        entry = Entry.find_by(id: params[:id])
        render json: entry
      end
      
      def create
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
        params.require(:entry).permit(:entrytext, :watched, :rating, :movie_id)
      end
      
end
