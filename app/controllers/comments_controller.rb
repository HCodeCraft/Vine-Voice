class CommentsController < ApplicationController

    # create the comment though the user
    def create
        newComment = @current_user.comment.create!(comment_params)
        render json: newComment
    end

    def update
        comment = find_comment
        comment.update(comment_params)
        render json: comment
    end

    def destroy
      comment = find_comment
      comment.destroy
      head :no_content
    end

    private

    def find_comment
        comment = @current_user.comments.find_by(id: params[:id])
      end
    

      # not sure if I need to include user_id?
      def comment_params
        params.require(:comment).permit(:text, :entry_id)
      end
end
