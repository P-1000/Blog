package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID             primitive.ObjectID `bson:"_id,omitempty"`
	Name           string             `bson:"name" binding:"required"`
	Email          string             `bson:"email" binding:"required,email"`
	Password       string             `bson:"password" binding:"required"`
	ProfilePic     string             `bson:"profilepic"`
	FollowingCount int                `bson:"following_count"`
	FollowerCount  int                `bson:"follower_count"`
	CreatedAt      time.Time          `bson:"created_at"`
	UpdatedAt      time.Time          `bson:"updated_at"`
}
