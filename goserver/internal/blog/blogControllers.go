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

func updateBlog(c *gin.Context) {
	userId, exists := c.Get("userId")
	blogId := c.Param("id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Access Token Not Found"})
		return
	}
	objId, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{"error": "Invalid Blog ID."})
	}
	var blogUpdate models.Blog
	if err := c.ShouldBind(&blogUpdate); err != nil {
		c.JSON(http.StatusNotAcceptable, gin.H{"error": "Invalid Blog Data"})
	}
	ctx, cancel := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancel()
	collection := database.GetCollection("blogs")

	//existing blog check :
	var existingBlog models.Blog
	if err := collection.FindOne(ctx, bson.M{"_id": objId}).Decode(&existingBlog); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog Not Found"})
		return
	}

	//Author Check :
	isAuthor := false
	for _, author := range existingBlog.Authors {
		if author == userId {
			isAuthor = true
			break
		}
	}

	if !isAuthor {
		c.JSON(http.StatusUnauthorized, gin.H{"Error": "Unauthorized"})
		return
	}

	update := bson.M{
		"$set": bson.M{
			"title":       blogUpdate.Title,
			"description": blogUpdate.Description,
			"tags":        blogUpdate.Tags,
			"cover_image": blogUpdate.CoverImage,
			"Content":     blogUpdate.Content,
			"updated_at":  time.Now(),
		},
	} //todo : partil update ;
	updated, err := collection.UpdateOne(ctx, bson.M{"_id": objId}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error updating blog"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"success": "blog updated ", "updated": updated})
}

func deleteBlog(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Access Token Not Found"})
		return
	}

	blogId := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Invalid Blog Id"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 6*time.Second)
	defer cancel()

	collection := database.GetCollection("blogs")
	var existingBlog models.Blog

	if err := collection.FindOne(ctx, bson.M{"_id": objId}).Decode(&existingBlog); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Blog Not Found"})
		return
	}

	isAuthor := false

	for _, author := range existingBlog.Authors {
		if author == userId {
			isAuthor = true
			break
		}
	}
	if !isAuthor {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Not authorized to delete this blog.!"})
		return
	}
	if err := collection.FindOneAndDelete(ctx, bson.M{"_id": objId}); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Something Unexpected "})
	}
	c.JSON(http.StatusOK, gin.H{"success": "Blog delted!"})
}
