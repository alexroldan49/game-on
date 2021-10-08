class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :game
      t.text :description
      t.string :image
      t.integer :claps
      t.belongs_to :user, null: false, foreign_key: true
      
      t.timestamps
    end
  end
end
