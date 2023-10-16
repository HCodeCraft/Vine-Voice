class SessionsController  < ApplicationController
  skip_before_action :authorize, only: [:create]


  def create
    puts session[:user_id]

    user = find_user
    Rails.logger.info("Session contents before: #{session.inspect}")

  if user && user.authenticate(params[:password])
      session[:user_id] = user.id

    Rails.logger.info("Session contents inside: #{session.inspect}")
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