class PostsController < ApplicationController

    def index
        render json: Post.all, status: :ok
    end
    
    def show 
        post = find_post
        if post
            render json: post, status: :ok
        else
            render_not_found
        end
    end

    def create
        post = current_user.authored_posts.new(post_params)
        if post.save
            render json: post, status: :created
        else
            render json: {errors: post.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def destroy
        post = find_post
        if post
            post.destroy
            render json: post, status: :ok
        else
            
        end
    end

    

    private 
    
    def post_params
        params.permit(:game, :description, :image, :user_id)
    end

    def find_post
        Post.find_by(id: params[:id])
    end

    def render_not_found
        render json: {erros: "Post not found"}, status: :not_found
    end
    
end
