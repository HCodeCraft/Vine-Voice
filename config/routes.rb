Rails.application.routes.draw do
  # Routes for plants, users, sessions, etc.
  resources :plants, only: [:index]
  resources :users, only: [:create, :show, :index]
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Fallback route for client-side routing (e.g., React, Vue.js)
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end




  # For more details on this file's DSL, see https://guides.rubyonrails.org/routing.html

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
