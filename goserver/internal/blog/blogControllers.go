package blog

import (
	"fmt"
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
	userIdInterface, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "no token"})
		return
	}

	userIdStr, ok := userIdInterface.(string)
	fmt.Println(userIdStr, "bankai")
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	userId, err := primitive.ObjectIDFromHex(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID format"})
		return
	}

	var blog models.Blog
	if err := c.ShouldBindJSON(&blog); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	blog.ID = primitive.NewObjectID()
	blog.Authors = []primitive.ObjectID{userId}
	blog.CreatedAt = time.Now()
	blog.UpdatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	blogCollection := database.GetCollection("blogs")
	_, err = blogCollection.InsertOne(ctx, blog)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error Creating Blog"})
		return
	}

	blogStats := models.BlogStats{
		ID:           primitive.NewObjectID(),
		BlogId:       blog.ID,
		LikeCount:    0,
		ViewCount:    0,
		CommentCount: 0,
		CreatedAt:    time.Now(),
		UpdatedAt:    time.Now(),
	}

	blogStatsCollection := database.GetCollection("blog_stats")
	_, err = blogStatsCollection.InsertOne(ctx, blogStats)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error Creating BlogStats"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": "Blog Created", "blog": blog, "blogStats": blogStats})
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

func likeBlog(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Access token not found"})
		return
	}
	objUserId, err := primitive.ObjectIDFromHex(userId.(string))
	blogId := c.Param("id")
	objId, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Blog Id"})
		return
	}
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := database.GetCollection("blog")
	if err := collection.FindOne(ctx, bson.M{"_id": objId}); err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "blog not found"})
		return
	}
	statsCollection := database.GetCollection("blog_stats")
	var blogStats models.BlogStats
	statsErr := statsCollection.FindOne(ctx, bson.M{"blogId": objId}).Decode(&blogStats)
	if statsErr != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error liking blog"})
		return
	}

	update := bson.M{
		"$inc": bson.M{
			"likeCount": 1,
		},
		"$set": bson.M{
			"updated_at": time.Now(),
		},
	}

	_, err = statsCollection.UpdateOne(ctx, bson.M{"blogId": objId}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "error liking blog"})
		return
	}

	likeCollection := database.GetCollection("likes")
	isLiked := likeCollection.FindOne(ctx, bson.M{"blogId": objId, "userId": objUserId})
	if isLiked != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Already Liked"})
		return
	}
	like := models.Like{
		ID:        primitive.NewObjectID(),
		UserId:    objUserId,
		BlogId:    objId,
		CreatedAt: time.Now(),
	}
	_, err = likeCollection.InsertOne(ctx, like)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error liking blog"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Blog liked successfully"})
}

func addComment(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Access token not found"})
		return
	}

	objUserId, err := primitive.ObjectIDFromHex(userId.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	blogId := c.Param("blogId")
	objBlogId, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Blog ID"})
		return
	}

	var comment models.Comment
	if err := c.BindJSON(&comment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid comment data"})
		return
	}

	comment.ID = primitive.NewObjectID()
	comment.BlogID = objBlogId
	comment.UserID = objUserId
	comment.CreatedAt = time.Now()

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	collection := database.GetCollection("comments")
	_, err = collection.InsertOne(ctx, comment)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error commenting on the blog"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"success": "Comment added"})
}

func getComments(c *gin.Context) {
	//todo :
}

func unLikeBlog(c *gin.Context) {
	userId, exists := c.Get("userId")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
		return
	}

	objUserId, err := primitive.ObjectIDFromHex(userId.(string))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User ID"})
		return
	}

	blogId := c.Param("id")
	objBlogId, err := primitive.ObjectIDFromHex(blogId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid Blog ID"})
		return
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Check if the user liked the blog
	likeCollection := database.GetCollection("likes")
	isLiked := likeCollection.FindOne(ctx, bson.M{"blogId": objBlogId, "userId": objUserId})
	if isLiked.Err() == mongo.ErrNoDocuments {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cannot unlike a blog that was not liked"})
		return
	}

	deletedLike, err := likeCollection.DeleteOne(ctx, bson.M{"blogId": objBlogId, "userId": objUserId})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error unliking the blog"})
		return
	}

	// Update the blog stats
	statsCollection := database.GetCollection("blog_stats")
	update := bson.M{
		"$inc": bson.M{
			"likeCount": -1,
		},
		"$set": bson.M{
			"updated_at": time.Now(),
		},
	}

	_, err = statsCollection.UpdateOne(ctx, bson.M{"blogId": objBlogId}, update)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error updating blog stats"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"success": "Blog unliked", "data": deletedLike})
}
