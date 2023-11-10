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
      render json: user
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end


  def show
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



  def destroy
    user = User.find(params[:id])
  
    if user
      if @current_user == user || (@current_user&.admin? && !user.admin?)
        user.destroy
        head :no_content
      else
        head :unauthorized
      end
    else
      head :not_found
    end
  end
  
  

  private

  # added avatar
  def user_params
    params.require(:user).permit(:username, :password, :name, :privacy, :email, :recieve_dev_emails, :status, :id, :admin, :avatar, :avatar_thumbnail, :password_confirmation)
  end

  # I removed :avatar

end
