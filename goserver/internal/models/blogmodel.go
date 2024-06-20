package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Blog struct {
	ID          primitive.ObjectID   `bson:"_id, omitempty"`
	Title       string               `bson:"name" binding:"required"`
	Description string               `bson:"name" binding:"required"`
	Tags        []string             `bson:"tags" binding:"required"`
	CoverImage  string               `bson:"coverimage" binding:"required"`
	Authors     []primitive.ObjectID `bson:"authors" binding:"required"`
	Content     string               `bson:"content" binding:"required"`
	CreatedAt   time.Time            `bson:"created_at"`
	UpdatedAt   time.Time            `bson:"updated_at"`
}
