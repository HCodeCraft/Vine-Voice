class UsersController < ApplicationController
  #  before_action :authenticate_user, only: :create

    def create
      user = User.create(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def index
      render json: User.all
    end
  
    # need to make it so all users can see the user's show route
    def show
        user = User.find_by(id: params[:id])
      
        if user
          render json: user
        else
          render json: { error: "User not found" }, status: :not_found
        end
      end
      
      def me
        render json: @current_user
      end
  
    private
  
    # missing :password_confirmation
    def user_params
      params.permit(:username, :password,  :name, :avatar_url, :image, :privacy, :email, :recieve_dev_emails, :status, :admin)
    end
end
