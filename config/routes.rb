Rails.application.routes.draw do
  
  namespace :api do
    resources :plants, only: [:index]
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end


  # For more details on this file's DSL, see https://guides.rubyonrails.org/routing.html

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
