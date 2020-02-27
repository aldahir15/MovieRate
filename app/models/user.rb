# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
    before_create :confirmation_token

    validates :username, :password_digest, :session_token, presence: true
    validates :username, uniqueness: true
    validates :email, uniqueness: true
    validates :password, length: {minimum: 6, allow_nil: true}
    after_initialize :ensure_session_token
    attr_reader :password
  
    def self.find_by_credentials(username, password)
      @user = User.find_by_username(username)
      if @user
        @user.is_password?(password) ? @user : nil
      else
        return nil
      end
    end
  
    def password=(password)
      @password = password
      self.password_digest = BCrypt::Password.create(password)
    end
  
    def is_password?(password)
      BCrypt::Password.new(self.password_digest).is_password?(password)
    end
  
    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64
    end
  
    def reset_session_token!
      self.session_token = SecureRandom.urlsafe_base64
      self.save!
      self.session_token
    end

    def email_activate
      self.email_confirmed = true
      self.confirm_token = nil
      save!(:validate => false)
    end

    private
    def confirmation_token
      if self.confirm_token.blank?
          self.confirm_token = SecureRandom.urlsafe_base64.to_s
      end
    end
  
    has_many :rating,
        primary_key: :id,
        foreign_key: :user_id,
        class_name: :Rating

end