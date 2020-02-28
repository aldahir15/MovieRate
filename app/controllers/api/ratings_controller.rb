class Api::RatingsController < ApplicationController
  def index
    @ratings = Rating.all
  end 

  def show
    @rating = Rating.find(params[:id])
  end

  def new
    @rating = Rating.new
  end

  def create
    @rating = Rating.new(rating_parms)
    if @rating.save
      render :show
    else
      flash[:errors] = @rating.errors.full_messages
    end
  end

  def edit
    @rating = Rating.find(params[:id])
  end

  def update
    @rating = Rating.find(params[:id])
    if @rating.update(rating_parms)
      return @rating
    else
      flash[:errors] = @rating.errors.full_messages
      render :edit
    end
  end

  def destroy
    @rating = Rating.find(params[:id])
    @rating.delete
  end

  def rating_parms
    params.require(:rating).permit(:rate, :movie_id, :user_id)
  end
end
