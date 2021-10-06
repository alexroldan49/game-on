class PostSerializer < ActiveModel::Serializer
  attributes :id, :game, :description, :image, :claps, :author

  has_many :comments

end
