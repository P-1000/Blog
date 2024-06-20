package blog

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/net/context"

	"goserver/internal/database"
	"goserver/internal/models"

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
