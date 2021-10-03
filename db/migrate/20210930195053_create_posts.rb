class CreatePosts < ActiveRecord::Migration[6.1]
  def change
    create_table :posts do |t|
      t.string :game
      t.string :description
      t.string :image
      t.integer :claps

      t.timestamps
    end
  end
end
