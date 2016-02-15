class Pictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.string :path
      t.decimal :accepted_top_left
      t.decimal :accepted_bottom_right
      t.integer :order
    end
  end
end
