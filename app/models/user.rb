class User < ApplicationRecord

    has_many :authored_posts, class_name: "Post", foreign_key: :user_id
    has_many :comments
    has_many :commented_posts, class_name: "Post", through: :comments, source: :post
    
    has_secure_password
end
