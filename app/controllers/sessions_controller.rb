class SessionsController  < ApplicationController
  # skip_before_action :authorize, only: [:create, :delete]


  def create
    puts session[:user_id]

    user = find_user
    Rails.logger.info("Session contents before: #{session.inspect}")

  if user && user.authenticate(params[:password])
    Rails.logger.info("Session contents: #{session.inspect}")
    puts session[:user_id]
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