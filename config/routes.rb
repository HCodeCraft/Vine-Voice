Rails.application.routes.draw do
  
  get 'render/index'

  # For more details on this file's DSL, see https://guides.rubyonrails.org/routing.html
  root 'render#index'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
