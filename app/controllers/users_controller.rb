class UsersController < ApplicationController
    # skip_before_action :authorize, only: [:create]

    def create
      user = User.create(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
  
    # need to make it so all users can see the user's show route
    # def show

    # end
  
    private
  
    def user_params
      params.permit(:username, :password, :password_confirmation, :name, :avatar_url, :image, :privacy, :email, :recieve_dev_emails, :status, :admin)
    end
end
