# Controller logic: fallback requests for React Router.
# Leave this here to help deploy your app later!
class FallbackController < ActionController::Base

  def index
    # React app index page
    render file:'/Users/hannabeytebiere/Development/code/phase-5/Vine-Voice/client/public/index.html'
  end
  #'public/index.html'
end
