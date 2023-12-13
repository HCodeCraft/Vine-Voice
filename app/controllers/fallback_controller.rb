class FallbackController < ActionController::Base
  def index
    render file: "/Users/hannabeytebiere/Development/code/phase-5/Vine-Voice/client/public/index.html"
  end
end
