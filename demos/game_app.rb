require 'sinatra/base'
require_relative 'game'

class MyApp < Sinatra::Base

  get '/' do
    erb :index
  end
  
  post '/color' do
    if GAME.over?
      redirect '/end'
    else
      GAME.guess_color(params[:color].downcase)
      redirect '/'
    end
  end

  get '/end' do
    erb :end
  end

end
