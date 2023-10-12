Rails.application.routes.draw do

  get '/search', to: "plants#search"
  # Routes for plants, users, sessions, etc.
  resources :plants, only: [:index, :show, :create, :destroy, :update]
  resources :users, only: [:create, :show, :index, :update]
  resources :entries, only: [:index, :show, :create, :update, :destroy]


  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"

  get '/search', to: "plants#search"

  # Fallback route for client-side routing (e.g., React, Vue.js)
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end




  # For more details on this file's DSL, see https://guides.rubyonrails.org/routing.html

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
