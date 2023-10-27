class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  before_action :authorize

  private

  def find_user
    user = User.find_by(username: params[:username])
  end


  def authorize
    @current_user = User.find_by(id: session[:user_id])
  
    render json: { errors: ["Not authorized in authorize"] }, status: :unauthorized unless @current_user
  end
  

  # def authorize
  #   if session[:user_id].present?
  #     @current_user = find_user
      
  #     if @current_user
  #       # User is authorized
  #     else
  #       Rails.logger.warn("User not found for session user_id: #{session[:user_id]}")
  #       render json: { errors: ["Not authorized"] }, status: :unauthorized
  #     end
  #   else
  #     Rails.logger.warn("No user_id in session")
  #     render json: { errors: ["Not authorized"] }, status: :unauthorized
  #   end
  # end
  

  # def authorize
  #   Rails.logger.debug("User ID in session before: #{session[:user_id]}")

  #   @current_user = User.find_by(id: session[:user_id])

  #   Rails.logger.debug("User ID in session: #{session[:user_id]}")

  #   render json: { errors: ["Not authorized pppppp"] }, status: :unauthorized unless @current_user
  # end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
