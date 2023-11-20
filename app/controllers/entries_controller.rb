class EntriesController < ApplicationController
  before_action :authorize

# added .with_attached_picture

  def index
    entries = Entry.all.with_attached_picture.includes(:user)
    render json: entries.to_json(include: { user: { only: [:id, :username] } })
  end


  def show
    entry = Entry.find_by(id: params[:id])
    render json: EntrySerializer.new(entry).to_json(include: [:plant, :user, :comments])
  end
  

  # def show
  #   entry = Entry.find_by(id: params[:id])
  #   render json: entry.to_json(include: [:plant, :user])
  # end
  

  # added the .to_json(include: :plant)

  def create
    @current_user = User.find_by(id: session[:user_id])

    if @current_user
      new_entry = @current_user.entries.create(entry_params)
      render json: new_entry
    else
      render json: { error: 'User not found' }, status: :unprocessable_entity
    end
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
