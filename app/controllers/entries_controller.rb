class EntriesController < ApplicationController
  before_action :authorize

# added .with_attached_picture
  def index
    entries = Entry.all.with_attached_picture
    render json: entries
  end

  def show
    entry = Entry.find_by(id: params[:id])
    render json: entry
  end

  def create
    @current_user = User.find_by(id: session[:user_id])

    new_entry = @current_user.entries.create(entry_params)

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
    @current_user = User.find_by(id: session[:user_id])
    entry = @current_user.entries.find_by(id: params[:id])
  end

  def entry_params
    params.require(:entry).permit(:nickname, :location, :notes, :user_id, :plant_id, :open_to_advice, :picture, :health, :problems => [])
  end
end
