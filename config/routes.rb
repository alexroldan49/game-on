Rails.application.routes.draw do
  
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  # get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  resources :posts
  resources :user_posts, only:[:create]

  post "/signup", to: "users#create"
  get "/me" , to: "users#show"
  patch "/profile", to: "users#update"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
end
