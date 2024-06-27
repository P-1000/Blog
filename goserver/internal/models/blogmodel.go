package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Blog struct {
	ID          primitive.ObjectID   `bson:"_id, omitempty"`
	Title       string               `bson:"title" binding:"required"`
	Description string               `bson:"description" binding:"required"`
	Tags        []string             `bson:"tags" binding:"required"`
	CoverImage  string               `bson:"coverimage" binding:"required"`
	Authors     []primitive.ObjectID `bson:"authors"`
	Content     string               `bson:"content" binding:"required"`
	CreatedAt   time.Time            `bson:"created_at"`
	UpdatedAt   time.Time            `bson:"updated_at"`
}
