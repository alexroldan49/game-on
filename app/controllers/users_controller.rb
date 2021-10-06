class UsersController < ApplicationController
    before_action :user_params, only: :create
    #post "/signup", to: "users#create"
   def create
    user = User.new(user_params)
    if user.save
        session[:user_id] = user.id
        render json: user, status: :created
    else
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end
   end


    #get "/me" , to: "user#show"
   def show
        user = User.find_by(id: session[:user_id])
        if user
            render json: user, status: :ok
        else
            render json: {errors: "Not authorized"}, status: :unauthorized
        end
   end

   def update
        user = User.find_by(id: session[:user_id])
        if user
            user.update(params.permit(:profile_picture, :bio))
            render json: user, status: :ok
        else
            render json: {errors: "Not authorized"}, status: :unauthorized
        end
   end
    


   private

   def user_params
    params.permit(:username, :password)
   end
   
   
end
