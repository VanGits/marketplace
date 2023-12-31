class ApplicationController < ActionController::API
    include ActionController::Cookies

    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

    before_action :authorize

    def fallback_index_html
        render file: 'public/index.html', layout: false
      end

    private

    def authorize
        @user = User.find_by(id: session[:user_id])
        render json: {error: "Not authorized"}, status: :unauthorized unless @user
    end

    def render_unprocessable_entity(invalid)
        render json: {errors: invalid.record.errors.full_messages}, status: :unprocessable_entity
    end
end
