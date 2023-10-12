class ApplicationController < ActionController::API
  include ActionController::Cookies

  # rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  # before_action :authorize

  private

  def find_user
    user = User.find_by(username: params[:username])
  end

  def authorize
    Rails.logger.debug("Session contents: #{session.inspect}")

    @current_user = User.find_by(id: session[:user_id])
    Rails.logger.debug("Current User: #{@current_user.inspect}")

    Rails.logger.debug("Session contents: #{session.inspect}")
    render json: { errors: ["Not authorized pppppp"] }, status: :unauthorized unless @current_user
  end

  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
  end
end
