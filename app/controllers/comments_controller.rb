class CommentsController < ApplicationController

    def create
        comment = Comment.new(:content)
        if comment.save
            render json: comment, status: :ok
        else
            render json: {erros: comment.errors.full_messages}, status: :created
        end
    end
    
end
