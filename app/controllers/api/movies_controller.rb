class Api::MoviesController < ApplicationController
  def index
    # Run rake db:seed:dump based on gem 'seed_dump'
    @movies = Movie.all
  end 

  def show
    @movie = Movie.find(params[:id])
  end

  def new
    @movie = Movie.new
  end

  def create
    @movie = Movie.new(movie_params)
    if @movie.save
    else
      flash[:errors] = @movie.errors.full_messages
      render :new
    end
  end

  def edit
    @movie = Movie.find(params[:id])
  end

  def update
    @movie = Movie.find(params[:id])
    if @movie.update(movie_params)
      redirect_to movie_url(@movie)
    else
      flash[:errors] = @movie.errors.full_messages
      render :edit
    end
  end

  def destroy
  end

  def movie_params
    params.require(:movie).permit(:title, :description, :img, :year, :genre)
  end
end
