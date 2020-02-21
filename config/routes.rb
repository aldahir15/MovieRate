Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"
  
  namespace :api, defaults: {format: :json} do
    resources :movies, :ratings
    resources :users, only: [:create, :show, :update, :movies]
    resources :users do 
      get :movies
    end
    resource :session, only: [:create, :destroy, :show] 
  end
end
