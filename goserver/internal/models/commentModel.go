package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Comment struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	UserID    primitive.ObjectID `bson:"user_id"`
	BlogID    primitive.ObjectID `bson:"blog_id"`
	Content   string             `bson:"content"`
	CreatedAt time.Time          `bson:"created_at"`
}
