class UserPostsController < ApplicationController


    def create
        user_post = current_user.user_posts.build(user_post_params)
        if user_post.save
            render json: user_post, status: :created
        else
            render json: {errors: user_post.errors.full_messages}, status: :unprocessable_entity
        end
    end
    
    

    private

    def user_post_params
        params.permit(:user_id, :post_id)
    end
end
