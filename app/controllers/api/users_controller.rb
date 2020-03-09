class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        if @user.save && !user_params[:email_confirmed]
            UserMailer.registration_confirmation(@user).deliver
            # redirect_to root_url
            # login(@user)
            # render "api/users/show"
        elsif @user.save && user_params[:email_confirmed]
            login(@user)
            render "api/users/show"
        else
            @user.errors.full_messages
            render json: @user.errors.full_messages, status: 422

        end
    end

    def show
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        # p "HELLLLLLLOOOOOOOO"
        # p params
        # @user.arr_events << params[:user][:arr_events].to_i
        # if @user.save
        #   render "api/users/show"
        # else
        #   @user.errors.full_messages
        #   render json: @user.errors.full_messages, status: 422
        #
        # end
    end

    def movies
        print("LOCO")
        print(params[:user_id])
        user = User.find(params[:user_id])
        @movies_and_ratings = user.rating.map { |rating|
          [Movie.find(rating.movie_id), rating]
        }
        print(@movies)
        print("NOTHING VATO")
    end

    def confirm_email
        user = User.find_by_confirm_token(params[:id])
        if user
            user.email_activate
            flash[:success] = "Welcome to the Sample App! Your email has been confirmed.
            Please sign in to continue."
            redirect_to root_url
        else
            flash[:error] = "Sorry. User does not exist"
            redirect_to root_url
        end
    end

        private
    def user_params
        params.require(:user).permit(:username, :password, :email, :email_confirmed)
    end
end
