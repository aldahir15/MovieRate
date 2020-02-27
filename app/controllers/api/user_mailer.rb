class Api::UserMailer < ActionMailer::Base
    default :from => "movieratesSignUp@gmail.com"

   def registration_confirmation(user)
      @user = user
      mail(:to => "#{user.username} <#{user.email}>", :subject => "Registration Confirmation")
   end

   def confirm_email_api_user_url(confirm_token)
      redirect_to root_url
   end
end