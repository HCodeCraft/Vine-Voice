class AuthenticationController < ApplicationController
    before_action :authenticate_user, only :destory
    # only destroy authorized?? that's what chat gippety says

  def create
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      # Generate a JWT token and include user information
      token = encode_token(user_id: user.id, username: user.username)
      render json: { user: user, token: token }
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def login
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      payload = { user_id: user.id }
      token = JWT.encode(payload, JWT_SECRET, "HS256")

      render json: { token: token }
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def refresh
    # Extract the refresh token from the request
    refresh_token = params[:refresh_token]

    # Verify the refresh token and retrieve the associated user
    user = User.find_by(refresh_token: refresh_token)

    if user
      # Generate a new access token and send it back
      new_access_token = encode_token(user_id: user.id, username: user.username)
      render json: { token: new_access_token }
    else
      render json: { error: "Invalid refresh token" }, status: :unauthorized
    end
  end

  def destroy
    render json: { message: 'Logged out successfully' }, status: :ok
  end



  private

  def encode_token(payload)
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def decode_token(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base)[0]
  end
end
