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
      @rating = Rating.new(movie_id: @movie.id, user_id: rating_params[:user_id])
      @rating.save
    elsif Movie.find_by(imdb_id: movie_params[:imdb_id])
      @user = User.find(rating_params[:user_id])
      @movie = Movie.find_by(imdb_id: movie_params[:imdb_id]);
      print("WHAT THE HECK IS GOING ON")
      print(@user.id)
      flag = true
      @user.rating.map do |rating| 
        if rating.movie == @movie
          print("\nfound it!!!!!!\n")
          flag = false
        end 
      end 
      if flag
        @rating = Rating.new(movie_id: @movie.id, user_id: rating_params[:user_id]) 
        @rating.save
      end
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
    @movie = Movie.find(params[:id])
    @movie.delete
  end

  def movie_params
    params.require(:movie).permit(:title, :description, :img, :year, :genre, :imdb_rating, :imdb_id)
  end

  def rating_params
    params.require(:movie).permit(:user_id)
  end

end
