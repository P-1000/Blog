package blog

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"

	"goserver/internal/database"

	"go.mongodb.org/mongo-driver/mongo"

	"goserver/internal/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func createBlog(c *gin.Context) {
	userId, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "no token"})
		return
	}

	var blog models.Blog
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	blog.ID = primitive.NewObjectID()
	blog.Authors = append(blog.Authors, userId.(primitive.ObjectID))

	blog.CreatedAt = time.Now()
	blog.UpdatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	blogCollection := database.GetCollection("blogs")
	_, err := blogCollection.InsertOne(ctx, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error Creating Blog"})
		return
	}
	c.JSON(http.StatusAccepted, gin.H{"success": "Blog Created"})
}

func getBlogById(c *gin.Context) {
	blogId := c.Query("blogId")
	if blogId == "" {
		c.JSON(http.StatusNotFound, gin.H{"error": "no blogId provided"})
		return
	}
	objID, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid blogId"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	blogCollection := database.GetCollection("blogs")

	var blog models.Blog
	if err := blogCollection.FindOne(ctx, bson.M{"_id": objID}).Decode(&blog); err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "blog not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	c.JSON(http.StatusOK, blog)
}

