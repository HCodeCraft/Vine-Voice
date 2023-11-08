class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create

    user = User.create!(user_params)

    if user.valid?
      session[:user_id] = user.id
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # added .with_attached_avatar
  def index
    render json: User.all.with_attached_avatar
  end

  # would need to do something to delete the previous avatar
  def update
    user = User.find_by(id: params[:id])
    if user.update(user_params)
      render json: user,  serializer: UserSerializer, exclude_entries: true, exclude_plants: true
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def show
    # not sure I need .with_attached_image
    user = User.find_by(id: params[:id])

    if user
      if user.privacy === true
        render json: user.slice(:username, :name, :avatar_url, :status)
      else
        render json: user
      end
    else
      render json: { errors: ["User not found"] }, status: :not_found
    end
  end

  # def show
  #   if @current_user
  #   render json: @current_user
  #   else
  #       render json: {error: "You must be logged in to access"}
  #   end
  # end

  def destroy
    user = find_user
    user.destroy
    head :no_content
  end

  private

  # added avatar
  def user_params
    params.require(:user).permit(:username, :password, :name, :privacy, :email, :recieve_dev_emails, :status, :id, :admin, :avatar, :avatar_thumbnail, :password_confirmation)
  end

  # I removed :avatar

end
