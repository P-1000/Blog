package user

import (
	"context"
	"goserver/internal/database"
	"goserver/internal/models"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func followUser(c *gin.Context) {
	userId, exists := c.Get("userId") // Subscriber ID
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
		return
	}

	subscriberID, err := primitive.ObjectIDFromHex(userId.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
		return
	}

	publisherID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publisher ID"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := database.GetCollection("follows")
	filter := bson.M{"follower_id": subscriberID, "publisher_id": publisherID}
	var existingFollow models.Follow
	err = collection.FindOne(ctx, filter).Decode(&existingFollow)
	if err == nil {
		c.JSON(http.StatusConflict, gin.H{"error": "User is already following this publisher"})
		return
	} else if err != mongo.ErrNoDocuments {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to check follow status"})
		return
	}

	session, err := database.GetMongoClient().StartSession()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start session"})
		return
	}
	defer session.EndSession(ctx)

	_, err = session.WithTransaction(ctx, func(sessionCtx mongo.SessionContext) (interface{}, error) {

		_, err := collection.InsertOne(sessionCtx, models.Follow{
			SubscriberID:   subscriberID,
			PublisherID:    publisherID,
			DateSubscribed: time.Now(),
		})
		if err != nil {
			return nil, err
		}

		usersCollection := database.GetCollection("users")
		_, err = usersCollection.UpdateOne(sessionCtx,
			bson.M{"_id": publisherID},
			bson.M{"$inc": bson.M{"follower_count": 1}})
		if err != nil {
			return nil, err
		}

		_, err = usersCollection.UpdateOne(sessionCtx,
			bson.M{"_id": subscriberID},
			bson.M{"$inc": bson.M{"following_count": 1}})
		if err != nil {
			return nil, err
		}

		return nil, nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to follow user", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully followed user"})
}

// unfollow user with update on user model also with mongosession
func unfollowUser(c *gin.Context) {
	userId, exists := c.Get("userId") // Subscriber ID
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Token not found"})
		return
	}

	subscriberID, err := primitive.ObjectIDFromHex(userId.(string))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid user ID"})
		return
	}

	publisherID, err := primitive.ObjectIDFromHex(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid publisher ID"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := database.GetCollection("follows")
	res, err := collection.DeleteOne(ctx, bson.M{"follower_id": subscriberID, "publisher_id": publisherID})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unfollow user"})
		return
	}

	if res.DeletedCount == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "User was not previously followed"})
		return
	}

	session, err := database.GetMongoClient().StartSession()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to start session"})
		return
	}
	defer session.EndSession(ctx)

	_, err = session.WithTransaction(ctx, func(sessionCtx mongo.SessionContext) (interface{}, error) {
		usersCollection := database.GetCollection("users")
		_, err := usersCollection.UpdateOne(sessionCtx,
			bson.M{"_id": publisherID},
			bson.M{"$inc": bson.M{"follower_count": -1}})
		if err != nil {
			return nil, err
		}

		// Update the following count of the subscriber
		_, err = usersCollection.UpdateOne(sessionCtx,
			bson.M{"_id": subscriberID},
			bson.M{"$inc": bson.M{"following_count": -1}})
		if err != nil {
			return nil, err
		}

		return nil, nil
	})

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to unfollow user", "details": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Successfully unfollowed user"})
}
