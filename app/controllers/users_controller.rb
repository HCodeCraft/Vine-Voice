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
  





    # would need to do something to delete the previous avatar
    def update
      user = User.find_by(id: params[:id])
      if user.update(user_params)

# there was a problem with this line wrong number of arguments, given 3 expected 0
        render json: UserSerializer.new(user).serializable_hash[:data][:attributes]
      else

        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    

#     def update
#       user = User.find_by(id: params[:id])
#       if user.update(user_params)
# byebug
# # there was a problem with this line wrong number of arguments, given 3 expected 0
#         render json: user
#       else

#         render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
#       end
#     end

    # delete this??
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
  
    # added avatar
    def user_params
      params.require(:user).permit(:username, :password,  :name, :avatar_url, :privacy, :email, :recieve_dev_emails, :status, :id, :admin, :avatar)
    end

    # It said unpermitted parameters: entries, plants, user so I added them, although not sure need them
    # in the end
end
