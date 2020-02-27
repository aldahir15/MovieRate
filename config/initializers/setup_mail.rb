ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.perform_deliveries = true

ActionMailer::Base.smtp_settings = {
  :address              => "smtp.gmail.com",
  :port                 => "587",
  :domain               => 'gmail.com',
  :user_name            => 'movieratesSignUp@gmail.com',
  :password             => 'Peachjam1210',
  :authentication       => 'plain',
  :enable_starttls_auto => true  }