class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create]

  def create
    user = find_user

    if user && user.authenticate(params[:password])
      session[:user_id] = user.id

      render json: user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    session.clear
    head :no_content
  end
end
