class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create]

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
  

    # need to make an update action
    def update
      user = User.find_by(id:params[:id])
      user.update(user_params)
      render json: user
    end


    def show
      if @current_user
      render json: @current_user
      else
          render json: {error: "You must be logged in to access"}
      end
    end

    def destroy
      user = find_user
      user.destroy
      head :no_content
    end
      
  
    private
  
    # missing :password_confirmation
    def user_params
      params.require(:user).permit(:username, :password,  :name, :avatar_url, :image, :privacy, :email, :recieve_dev_emails, :status, :admin, :id)
    end

    # It said unpermitted parameters: entries, plants, user so I added them, although not sure need them
    # in the end
end
