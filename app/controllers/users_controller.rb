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
      render json: User.all.with_attached_image
    end
  

    # need to make an update action
    # def update
    #   user = User.find_by(id:params[:id])
    #   user.update(user_params)
    #   render json: user
    # end

    def update
      user = User.find_by(id: params[:id])
      if user.update(user_params)
        logger.info("User updated successfully: #{user.inspect}")

        render json: user
      else
        logger.error("User update failed: #{user.errors.full_messages}")
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

    def public_profile
      user = User.find_by(id: params[:id])
    
      if user
        if user.privacy === true
          render json: user.slice(:username, :name, :avatar_url, :status)
        else
          render json: user
        end
      else
        render json: { errors: ["User not found"] }, status: :not_found
      end
    end


    def show
      # not sure I need .with_attached_image
      user = User.find_by(id: params[:id])
    
      if user
        if user.privacy === true
          render json: user.slice(:username, :name, :avatar_url, :status)
        else
          render json: user
        end
      else
        render json: { errors: ["User not found"] }, status: :not_found
      end
    end
    

    # def show
    #   if @current_user
    #   render json: @current_user
    #   else
    #       render json: {error: "You must be logged in to access"}
    #   end
    # end


    
    

    def destroy
      user = find_user
      user.destroy
      head :no_content
    end
      
  
    private
  
    # missing :password_confirmation
    def user_params
      params.require(:user).permit(:username, :password,  :name, :avatar_url, :image, :privacy, :email, :recieve_dev_emails, :status, :id, :admin)
    end

    # It said unpermitted parameters: entries, plants, user so I added them, although not sure need them
    # in the end
end
