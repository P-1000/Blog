package feed

import (
	"context"
	"goserver/internal/database"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func getGeneralFeed(c *gin.Context) {

}

func customFeed(c *gin.Context) {
	userID, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found in context"})
		return
	}

	objUserID, err := primitive.ObjectIDFromHex(userID.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	pipeline := mongo.Pipeline{

		{{"$match", bson.D{
			{"createdAt", bson.D{
				{"$gte", primitive.NewDateTimeFromTime(time.Now().AddDate(0, 0, -30))}, // Adjust date range as needed
			}},
		}}},

		{{"$lookup", bson.D{
			{"from", "blogstats"},
			{"localField", "_id"},
			{"foreignField", "blogId"},
			{"as", "stats"},
		}}},
		{{"$addFields", bson.D{
			{"likesCount", bson.D{{"$sum", "$stats.likeCount"}}},
			{"viewCount", bson.D{{"$sum", "$stats.viewCount"}}},
			{"commentCount", bson.D{{"$sum", "$stats.commentCount"}}},
		}}},

		{{"$sort", bson.D{
			{"likesCount", -1},
			{"createdAt", -1},
		}}},
		{{"$lookup", bson.D{
			{"from", "follows"},
			{"let", bson.D{
				{"authorIds", "$authors"},
			}},
			{"pipeline", mongo.A{
				bson.D{
					{"$match", bson.D{
						{"$expr", bson.D{
							{"$in", mongo.A{"$publisher_id", "$$authorIds"}},
						}},
						{"subscriber_id", objUserID},
					}},
				},
			}},
			{"as", "follows"},
		}}},

		{{"$addFields", bson.D{
			{"followScore", bson.D{
				{"$cond", mongo.A{
					bson.D{
						{"$gt", mongo.A{bson.D{{"$size", "$follows"}}, 0}},
					},
					2,
					1,
				}},
			}},
		}}},
		{{"$project", bson.D{
			{"_id", 1},
			{"title", 1},
			{"description", 1},
			{"coverImage", 1},
			{"authors", 1},
			{"createdAt", 1},
			{"updatedAt", 1},
			{"likesCount", 1},
			{"viewCount", 1},
			{"commentCount", 1},
			{"followScore", 1},
		}}},
	}

	collection := database.GetCollection("blogs")
	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to aggregate blogs"})
		return
	}
	defer cursor.Close(ctx)

	var blogs []bson.M
	if err := cursor.All(ctx, &blogs); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to decode blogs"})
		return
	}

	c.JSON(http.StatusOK, blogs)
}
