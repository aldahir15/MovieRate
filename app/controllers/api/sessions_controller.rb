class Api::SessionsController < ApplicationController
    def create
      @user = nil
      if params[:user][:from_google] 
        @user = User.find_by(email: params[:user][:email])
      else 
        @user = User.find_by_credentials(params[:user][:username], params[:user][:password])
      end 
      # if @user
      #   login(@user)
      #   render "api/users/show"
      # else
      #   render json: ["Invalid username/password"], status: 401
      # end

      if @user && @user.email_confirmed
        login(@user)
        render "api/users/show"
      elsif @user && !@user.email_confirmed
        message = "Please confirm your email by clicking the link sent to " + @user.email + "."
        render json: [message], status: 401
      else 
        render json: ["Invalid username/password"], status: 401
      end

    end
  
    def destroy
      if current_user
        logout
      else
        render json: ["Not Logged In"], status: 404
      end
    end
  end