class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    puts "Received parameters: #{params.inspect}"
    user = User.new(user_params)

    if user.save
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def index
    render json: User.all.with_attached_avatar
  end

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
        render json: user.slice(:username, :name, :avatar_url, :status, :id, :privacy, :plants).to_json
      else
        render json: user, serializer: UserSerializer
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

  def user_params
    params.require(:user).permit(:username, :password, :name, :privacy, :email, :recieve_dev_emails, :status, :id, :admin, :avatar, :avatar_thumbnail, :password_confirmation)
  end
end
