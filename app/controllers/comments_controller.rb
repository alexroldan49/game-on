class CommentsController < ApplicationController

    def create
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment, status: :ok
        else
            render json: {erros: comment.errors.full_messages}, status: :created
        end
    end
    
    def index
        render json: Comment.all
    end
    
    private

    def comment_params
        params.permit(:content, :user_id, :post_id)
    end
    
end
