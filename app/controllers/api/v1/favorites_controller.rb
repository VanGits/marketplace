class Api::V1::FavoritesController < ApplicationController

    # user's favorites
    def index
        favorites = @user.favorited_items.all
        render json: favorites, status: :ok
    end

    # item's favorited users

    def show 
        item = find_item
        favorites = item.favorited_by_users
        render json: favorites, status: :ok
    end

    # add user to favorited users 
    def update
        item = find_item
        @user.favorited_items << item
        render json: item, status: :created
    end

    # delete user from favorited users

    def destroy
        item = find_item
        @user.favorited_items.delete(item)
        head :no_content
    end

    private 

    def find_item
        ItemListing.find(params[:id])
      end
end
