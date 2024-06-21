package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type BlogStats struct {
	ID           primitive.ObjectID `bson:"_id, omitempty"`
	BlogId       primitive.ObjectID `bson:"blogId" binding:"required"`
	LikeCount    int                `bson:"likeCount"`
	ViewCount    int                `bson:"viewCount"`
	CommentCount int                `bson:"commentCount"`
	CreatedAt    time.Time          `bson:"created_at"`
	UpdatedAt    time.Time          `bson:"updated_at"`
}

