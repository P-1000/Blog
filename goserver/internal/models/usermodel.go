package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID               primitive.ObjectID `bson:"_id,omitempty"`
	Name             string             `bson:"name" binding:"required"`
	Email            string             `bson:"email" binding:"required,email"`
	Password         string             `bson:"password" binding:"required"`
	Followers        []string           `bson:"followers"`
	Following        []string           `bson:"following"`
	Bookmarks        []string           `bson:"bookmarks"`
	ProfilePic       string             `bson:"profilepic"`
	Bio              string             `bson:"bio"`
	Website          string             `bson:"website"`
	LinkedIn         string             `bson:"linkedin"`
	GitHub           string             `bson:"github"`
	Location         string             `bson:"location"`
	TechStack        []string           `bson:"techstack"`
	Tags             []string           `bson:"tags"`
	ResetToken       string             `bson:"resettoken"`
	ResetTokenExpiry time.Time          `bson:"resettokenexpiry"`
	CreatedAt        time.Time          `bson:"created_at"`
	UpdatedAt        time.Time          `bson:"updated_at"`
}
