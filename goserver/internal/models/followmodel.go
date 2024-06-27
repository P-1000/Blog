package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

type Follow struct {
	ID             primitive.ObjectID `bson:"_id,omitempty"`
	PublisherID    primitive.ObjectID `bson:"publisher_id"`
	SubscriberID   primitive.ObjectID `bson:"subscriber_id"`
	DateSubscribed time.Time          `bson:"date_subscribed"`
}
