class PicturesController < ApplicationController
  def index
    @pictures = Picture.all
    respond_to do |format|
      format.json { render json: @pictures }
    end
  end
end
