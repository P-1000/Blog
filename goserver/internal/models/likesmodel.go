package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Like struct {
	ID        primitive.ObjectID `bson:"_id, omitempty"`
	UserId    primitive.ObjectID `bson:"likedUser"`
	BlogId    primitive.ObjectID `bson:"blogId"`
	CreatedAt time.Time          `bson:"created_at"`
}
