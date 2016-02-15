class Picture < ActiveRecord::Base
  validates :path, presence: true
  validates :accepted_top_left, presence: true
  validates :accepted_bottom_right, presence: true
end
